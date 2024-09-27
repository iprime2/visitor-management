"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ClipLoader from "react-spinners/ClipLoader";
import BodyWrapper from "@/components/BodyWrapper";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/Heading";

const fileSchema = z.object({
  file: typeof File !== "undefined" ? z.instanceof(File) : z.any(),
});

// const fileSchema = z.object({
// file: z.instanceof(File),
// .refine(
//   (file) => [".xlsx", ".xls"].includes(file.name.split(".").pop() || ""),
//   { message: "Only .xlsx and .xls files are allowed" }
// ),
// });

type FileUploadFormValues = z.infer<typeof fileSchema>;

interface DataType {
  name: string;
  prn: string;
  mobile: string;
  type: string;
}

const SettingsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FileUploadFormValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      form.setValue("file", selectedFile);
    }
  };

  const onSubmit = async (data: FileUploadFormValues) => {
    setLoading(true);

    try {
      const jsonData = { seedData: await handleFileConversion(data) };
      const response = await axios.post("/api/seed", jsonData);
      console.log(response);
      if (response.status === 201) {
        toast({
          description: "Data uploaded successfully!",
          variant: "success",
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        const errMessage = error?.response?.data;
        toast({
          description: errMessage,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileConversion = async (
    data: FileUploadFormValues
  ): Promise<DataType[]> => {
    return new Promise<DataType[]>((resolve, reject) => {
      if (!data.file) {
        reject("No file selected");
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const buffer = e.target.result;
          const workbook = XLSX.read(buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as DataType[];

          const jsonDataString = jsonData.map((item) => ({
            ...item,
            prn: item.prn.toString(),
            mobile: item.mobile.toString(),
          }));
          resolve(jsonDataString);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(data.file);
    });
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      const response = await axios.delete("/api/seed");
      if (response.status === 200) {
        toast({
          description: "Data deleted successfully!",
          variant: "success",
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        const errMessage = error?.response?.data;
        toast({
          description: errMessage,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          description: "Something went wrong!!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BodyWrapper>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col">
          <Heading title="Settings" description="Manage Settings" />
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Data</FormLabel>
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
            <div className="w-full flex justify-center gap-2">
              <Button disabled={loading} className="w-full gap-2" type="submit">
                {loading && <ClipLoader color="white" size="20" />} Upload
              </Button>
              <Button
                disabled={loading}
                onClick={() => deleteData()}
                className="w-full gap-2"
                type="button"
              >
                {loading && <ClipLoader color="white" size="20" />} Delete
              </Button>
            </div>
          </form>
        </Form>
        <Separator />
        <div className="w-full h-auto p2">
          <p>
            <span className="font-bold">Note:</span> If you want fresh/new data
            first Delete prvious data by clicking on Delete Button, Otherwise
            upload excel file and click on Upload.
          </p>
          <h3>1. Upload Button upload&apos;s excel file data in Database</h3>
          <h3>2. Delete Button delete data from Database</h3>
        </div>
      </div>
    </BodyWrapper>
  );
};

export default SettingsPage;
