"use client";

import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import axiosInstance from "@/lib/axioswrapper";

const visitorFormSchema = z.object({
  visitorPrn: z.string(),
  visitorName: z.string(),
  mobile: z.string(),
  attendeeId: z.string(),
  query: z.string(),
});

type VisitorsFormValues = z.infer<typeof visitorFormSchema>;

type EntryFormPropsType = {
  attendees:
    | { id: string; name: string; createdAt: Date }[]
    | string
    | null
    | undefined;
  type: string;
};

const EntryForm: FC<EntryFormPropsType> = ({ attendees, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const feedbackModal = useFeedbackModal();
  const [mounted, setMounted] = useState<boolean>(false);
  const [visitorType, setVisitorType] = useState<string | null>(null);
  
  const form = useForm<VisitorsFormValues>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      visitorPrn: "",
      visitorName: "",
      mobile: "",
      attendeeId: "",
      query: "",
    },
  });

  const { setFocus } = form;

  useEffect(() => {
    setMounted(true);
    setFocus("visitorPrn");
  }, [setFocus]);



  if (!mounted) {
    return null;
  }

  const onSubmit = async (data: VisitorsFormValues) => {
    setLoading(true);

    try {
      console.log(data);
      const response = await axiosInstance.post(`/visitors`, data);
      console.log(response);
      // const responseStatusCode = response.status;
      if (response.status === 201) {
        toast({
          description: "Visitor Entry done!",
          variant: "success",
        });
      }else {
        toast({
          description: "Something went wrong! Visitor Entry not Done!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      router.refresh();
      resetForm();
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        toast({
          title: error.response.data.error,
          description: error.response.data.message,
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

  const sendFeedbackMessage = async (mobile: string, visitorId: string) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/api/message`, {
        mobile,
        visitorId,
      });
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
    form.reset({
      visitorPrn: "",
      visitorName: "",
      mobile: "",
      attendeeId: "",
      query: "",
    });
  };

  const toggleVisitorType = (value: string) => {
    setVisitorType(value);
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-4 mb-4 mt-4">
        {type !== "admin" && (
          <h2 className="sm:text-2xl md:text-4xl flex w-full item-center justify-center font-bold">
            Welcome to MIT-WPU.
          </h2>
        )}
        <div className="w-full flex gap-4">
          <Button
            className="sm:w-full md:w-[200px]"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              toggleVisitorType("studentEmployee")
            }
          >
            Student/Employee
          </Button>
          <Button
            className="sm:w-full md:w-[200px]"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              toggleVisitorType("others")
            }
          >
            Other
          </Button>
        </div>
      </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-auto flex flex-col gap-4"
          >
            <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-2">
              {true && (
                <FormField
                  // className="transition-all duration-100 ease-in-out"
                  control={form.control}
                  name="visitorPrn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student PRN/ Employee ID</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={"Enter Student PRN number / Employee ID"}
                          tabIndex={0} 
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your Student PRN number or Employee ID.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {visitorType === "others" && (
                <>
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
                        <FormDescription>
                          Please enter your name.
                        </FormDescription>
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
                        <FormDescription>
                          Please enter your mobile number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="attendeeId"
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
                        {attendees &&
                          Array.isArray(attendees) &&
                          attendees.map(
                            (attendee: {
                              id: string;
                              name: string;
                              createdAt: Date;
                            }) => (
                              <SelectItem
                                key={attendee.id}
                                value={attendee.id}
                              >
                                {attendee.name}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                    {type === "admin" && (
                      <FormDescription>
                        You can manage{" "}
                        <Link href="/admin/attendees" className="text-blue-500">
                          attendees settings
                        </Link>
                        .
                      </FormDescription>
                    )}
                    {type === "public" && (
                      <FormDescription>
                        Please select the visitor whom you want to meet.
                      </FormDescription>
                    )}
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
                    <FormDescription>Please enter your query.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-center mt-4 gap-2">
              <Button disabled={loading} className="w-full gap-2" type="submit">
                {loading && <ClipLoader color="white" size="20" />} Submit
              </Button>
              <Button
                disabled={loading}
                className="w-full gap-2"
                type="button"
                onClick={() => resetForm()}
              >
                {loading && <ClipLoader color="white" size="20" />} Clear Form
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
};

export default EntryForm;
