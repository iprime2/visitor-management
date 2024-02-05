"use client";

import React, { FC, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const visitorFormSchema = z.object({
  visitorPrn: z.string(),
  visitorName: z.string(),
  mobile: z.string(),
  attendedBy: z.string(),
});

type VisitorsFormValues = z.infer<typeof visitorFormSchema>;

const attendedByOptions = ["Mr. Hairsh", "Dean", "Vice Chairman"];

const EntryForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<VisitorsFormValues>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      visitorPrn: "",
      visitorName: "",
      mobile: "",
      attendedBy: "",
    },
  });

  const onSubmit = async (data: VisitorsFormValues) => {
    setLoading(true);

    try {
      await axios.post(`/api/visitors`, data);
      toast({
        description: "Entry done!",
        variant: "success",
      });
      router.refresh();
      resetForm();
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

  const resetForm = () => {
    form.reset();
    form.setValue("attendedBy", "");
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="visitorPrn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visitor PRN</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={"Enter PRN number"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visitorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visitor Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={"Enter Visitor Name"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visitor Mobile No.</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={"Enter Visitor Mobile No."}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="attendedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attended By</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a attendee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {attendedByOptions.map((attend) => (
                      <SelectItem key={attend} value={attend}>
                        {attend}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center gap-2">
            <Button disabled={loading} className="w-full" type="submit">
              Submit
            </Button>
            <Button
              disabled={loading}
              className="w-full"
              type="button"
              onClick={() => resetForm()}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EntryForm;
