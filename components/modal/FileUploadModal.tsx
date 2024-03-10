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
import { ImageUpload } from "../ImageUpload";
import { Input } from "../ui/input";

interface FileUploadModalProps {}

const fileUploadFormSchema = z.object({
  file: typeof File !== "undefined" ? z.instanceof(File) : z.any(),
});

export type FileUploadFormValues = z.infer<typeof fileUploadFormSchema>;

const FileUploadModal: FC<FileUploadModalProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const fileUploadModal = useFileUploadModal();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FileUploadFormValues>({
    resolver: zodResolver(fileUploadFormSchema),
    defaultValues: {
      file: "",
    },
  });

  if (!mounted) {
    return null;
  }

  const onSubmit = async (data: FileUploadFormValues) => {
    const formData = new FormData();
    formData.append("files", data.file);
    // formData.append("visitorId", fileUploadModal.visitorId);
    try {
      setLoading(true);
      const res = await axios.post("/api/visitors/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "File Uploaded!",
        variant: "success",
      });
      form.reset();
      // fileUploadModal.onClose();
    } catch (error) {
      console.log(error);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      form.setValue("file", selectedFile);
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
                    accept=".xlsx, .xls"
                    disabled={loading}
                    onChange={handleFileChange}
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
