"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import CustomModal from "./CustomModal";

import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useFileUploadModal } from "@/hooks/useFileUploadModal";
import { Input } from "../ui/input";
import { ArrowDownToLineIcon, EyeIcon, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import axiosInstance from "@/lib/axioswrapper";

interface FileUploadModalProps {}

const fileUploadFormSchema = z.object({
  file: typeof File !== "undefined" ? z.instanceof(File) : z.any(),
  // file: z.any().refine((file) => !!file, {
  //   message: "Please select a file",
  // }),
  name: z.string().min(1, { message: "Please enter file name" }),
});

export type FileUploadFormValues = z.infer<typeof fileUploadFormSchema>;

const FileUploadModal: FC<FileUploadModalProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const fileUploadModal = useFileUploadModal();

  const [mounted, setMounted] = useState<boolean>(false);

  const [filesData, setFileData] = useState<string[]>([]);

  const visitorId = fileUploadModal.visitorId;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitorId]);

  const form = useForm<FileUploadFormValues>({
    resolver: zodResolver(fileUploadFormSchema),
    defaultValues: {
      file: "",
      name: "",
    },
  });

  const fetchData = async () => {
    setFileData([]);
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/files/visitors/${visitorId}`);
      console.log(res);

      if (res.status === 200) {
        setFileData(res?.data);
        toast({
          variant: "success",
          title: "Documents",
          description: "Documents fetched successfully",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to fetch documents",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted && !visitorId) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      form.setValue("file", selectedFile);
    }
  };

  const onSubmit = async (data: FileUploadFormValues) => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('fileName', data.name); 
    formData.append('visitorId', visitorId as string);
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        toast({
          variant: "success",
          title: "File Uploaded!",
          description: res.data.message
        });
        form.reset();
        setTimeout(() => {
          fetchData();
        }, 3000);
      }
    } catch (error: any) {
      console.log("File_Upload_Error:",error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error?.response?.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const openFile = async (id: string) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `files/view/${id}`,
        {
          responseType: "blob",
        }
      );

      // Get the content type from the response headers (e.g., image/jpeg, application/pdf)
      const contentType = response.headers['content-type'];

      // Create a new Blob object with the response data and the content type
      const fileBlob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob object
      const fileURL = window.URL.createObjectURL(fileBlob);

      // Open the file in a new tab
      window.open(fileURL, "_blank", "noopener,noreferrer");
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.response?.data?.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (filePath: string, fileName: string, id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/files/${id}`);

      if (response.status === 200) {
        toast({
          variant: "success",
          title: "File Deleted!",
          description: `File ${fileName} deleted successfully`,
        });
        fetchData();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (id: string, fileName: string) => {
    try {
      const response = await axiosInstance.get(
        `files/download/${id}`,
        {
          responseType: "blob",
        }
      );

       // Extract the file name from the Content-Disposition header (if provided by backend)
      const contentDisposition = response.headers['content-disposition'];
      // let fileName = fileName; // Fallback name if Content-Disposition header isn't set
      if (contentDisposition && contentDisposition.includes('filename=')) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches && matches.length === 2) {
          fileName = matches[1];
        }
      }

      // Create a URL for the blob and trigger the download
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Download file with the correct name
      document.body.appendChild(link);
      link.click();

      // Cleanup: Remove the link and URL after download
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your request.`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      }); 
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    disabled={loading}
                    onChange={handleFileChange}
                    name="file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter the file name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-3" disabled={loading}>
            {loading && <ClipLoader color="white" size="20" />}
            Submit
          </Button>
        </form>
      </Form>
      <Separator />
      <div className="w-full flex flex-col justify-center px-4 text-md">
        {loading ? (
          <div className="w-full item-center justify-center flex">
            <ClipLoader size="30" />
          </div>
        ) : filesData?.length > 0 ? (
          filesData.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center space-y-4 justify-between"
            >
              <p>{item?.fileName}</p>
              <div className="flex items-center justify-center space-x-4 text-sm w-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <EyeIcon
                        onClick={(
                          e: React.MouseEvent<SVGSVGElement, MouseEvent>
                        ) => openFile(item.id)}
                        className="hover:cursor-pointer text-sm text-slate-600 hover:text-fuchsia-700"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ArrowDownToLineIcon
                        onClick={() => downloadFile(item.id, item.fileName)}
                        className="hover:cursor-pointer text-sm text-slate-600 hover:text-violet-600"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Trash2Icon
                        onClick={() =>
                          deleteFile(item.filePath, item.fileName, item.id)
                        }
                        className="hover:cursor-pointer text-sm text-slate-600 hover:text-red-600"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))
        ) : (
          "No Files."
        )}
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col items-center justify-center"></div>
  );

  return (
    <CustomModal
      title="File Upload"
      disabled={loading}
      onSubmit={onSubmit}
      isOpen={fileUploadModal.isOpen}
      onClose={fileUploadModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default FileUploadModal;
