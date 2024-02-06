"use client";

import React, { FC, useEffect, useRef, useState } from "react";
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
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import ClipLoader from "react-spinners/ClipLoader";

const visitorFormSchema = z.object({
  visitorPrn: z.string(),
  visitorName: z.string(),
  mobile: z.string(),
  attendedBy: z.string(),
  query: z.string(),
});

type VisitorsFormValues = z.infer<typeof visitorFormSchema>;

type EntryFormPropsType = {
  attendees: { id: string; name: string }[] | null | undefined;
};

const EntryForm: FC<EntryFormPropsType> = ({ attendees }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackModal = useFeedbackModal();

  const form = useForm<VisitorsFormValues>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      visitorPrn: "",
      visitorName: "",
      mobile: "",
      attendedBy: "",
      query: "",
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    feedbackModal.onOpen();
  }, []);

  const onSubmit = async (data: VisitorsFormValues) => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/visitors`, data);
      const responseStatusCode = response.status;
      if (responseStatusCode === 201) {
        toast({
          description: "Visitor Entry done!",
          variant: "success",
        });
      }
      if (responseStatusCode === 200) {
        toast({
          description: "Visitor Checked Out!",
          variant: "success",
        });
        feedbackModal.onOpen();
      }
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
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 1000);
    }
  };

  const resetForm = () => {
    form.reset();
    form.setValue("attendedBy", "");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    feedbackModal.onOpen();
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
                <FormLabel>Student PRN/ Employee ID</FormLabel>
                <FormControl>
                  <Input
                    className="focus"
                    disabled={loading}
                    placeholder={"Enter Student PRN number / Employee ID"}
                    {...field}
                    ref={inputRef}
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
                <FormLabel>Whom you want to Meet?</FormLabel>
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
                    {attendees?.map((attendee) => (
                      <SelectItem key={attendee.id} value={attendee.name}>
                        {attendee.name}
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
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Query</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={"Enter Query"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center gap-2">
            <Button disabled={loading} className="w-full gap-2" type="submit">
              {loading && (
                <ClipLoader className="font-extrabold text-white" size={22} />
              )}{" "}
              Submit
            </Button>
            <Button
              disabled={loading}
              className="w-full"
              type="button"
              onClick={() => resetForm()}
            >
              {loading && (
                <ClipLoader className="font-extrabold text-white" size={22} />
              )}{" "}
              Clear Form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EntryForm;
