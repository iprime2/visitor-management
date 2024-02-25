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

type RemarkInputProps = {
  visitorId: string;
  initialData?: { remark: string } | null;
};

const remarkFormSchema = z.object({
  remark: z.string().min(1),
});

type RemarkFormValues = z.infer<typeof remarkFormSchema>;

const RemarkInput: FC<RemarkInputProps> = ({ visitorId, initialData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  //   const router = useRouter();
  //   const [initialData, setInitialData] = useState(null);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`/api/visitors/remark/${visitorId}`);
  //       console.log(res.data);
  //       setInitialData(res.data);
  //     } catch (error: any) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  if (initialData) {
    console.log(initialData);
  }
  // console.log(initialData);

  const form = useForm<RemarkFormValues>({
    resolver: zodResolver(remarkFormSchema),
    defaultValues: initialData
      ? initialData
      : {
          remark: "check",
        },
  });

  const onSubmit = async (data: RemarkFormValues) => {
    setLoading(true);

    console.log(data);

    const finalData = {
      visitorId: visitorId,
      remark: data.remark,
    };

    try {
      await axios.post(`/api/visitors/remark`, finalData);
      toast({
        description: "Remark Saved!",
        variant: "success",
      });
      //   router.refresh();
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
    <div className="w-[140px]">
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
