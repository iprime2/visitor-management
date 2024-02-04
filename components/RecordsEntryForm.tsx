"use client";

import React, { FC, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

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
import { useForm } from "react-hook-form";
import { ToastAction } from "./ui/toast";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  prn: z.string().min(1, { message: "Name must not be empty" }),
});

type UserFormValues = z.infer<typeof formSchema>;

type RecordsEntryFormPropsType = {
  fetchData: () => void;
};

const RecordsEntryForm: FC<RecordsEntryFormPropsType> = ({ fetchData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prn: "" },
  });

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);

    try {
      const res = await axios.post(`/api/records/new`, data);
      router.refresh();
      if (res.status === 200) {
        toast({
          description: "Entry Out done!",
          variant: "success",
        });
      }
      if (res.status === 201) {
        toast({
          description: "Entry In done!",
          variant: "success",
        });
      }
      fetchData();
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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="prn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PRN No.</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter PRN Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RecordsEntryForm;
