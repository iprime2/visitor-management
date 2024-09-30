"use client";
import React, { FC, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import axiosInstance from "@/lib/axioswrapper";

type RemarkInputProps = {
  visitorId: string;
  initialData: { remark: string };
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
};

const remarkFormSchema = z.object({
  remark: z.string(),
});

type RemarkFormValues = z.infer<typeof remarkFormSchema>;

const RemarkInput: FC<RemarkInputProps> = ({
  visitorId,
  initialData,
  setEdit,
  fetchData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RemarkFormValues>({
    resolver: zodResolver(remarkFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: RemarkFormValues) => {
    setLoading(true);

    try {
      await axiosInstance.patch(`/visitors/remark/${visitorId}`, {remark: data.remark});
      toast({
        description: "Remark Saved!",
        variant: "success",
      });
      setEdit(false);
      router.refresh();
      fetchData();
    } catch (error: any) {
      console.log("Update_remark",error);
      if (error.response.data) {
        toast({
          title: error?.response?.data?.error,
          description: error?.response?.data?.message,
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
    <div className="w-full p-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="remark"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter the remark"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RemarkInput;
