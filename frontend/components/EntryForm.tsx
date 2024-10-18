"use client";

import React, { FC, useEffect, useState } from "react";
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
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "@/lib/axioswrapper";

const visitorFormSchema = z.object({
  visitorPrn: z.string().nonempty("PRN is required"),
  visitorName: z.string(),
  mobile: z.string(),
  attendeeId: z.string(),
  query: z.string(),
});

type VisitorsFormValues = z.infer<typeof visitorFormSchema>;

type EntryFormPropsType = {
  attendees: { id: string; name: string; createdAt: Date }[] | null;
  type: string;
};

const EntryForm: FC<EntryFormPropsType> = ({ attendees, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [visitorType, setVisitorType] = useState<string | null>("studentEmployee");
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    setMounted(true);

    const intervalId = setInterval(() => {
      inputRef.current?.focus();
    }, 10000); // Focus every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (mounted) {
      inputRef.current?.focus();
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const tiggerFocus = () => {
    inputRef.current?.focus();
    console.log("hello");
  }

  const onSubmit = async (data: VisitorsFormValues) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/visitors`, data);
      if (response.status === 201) {
        toast({
          description: "Visitor Entry done!",
          variant: "success",
        });
        resetForm();
        tiggerFocus();
        router.refresh();
      } else {
        toast({
          description: "Something went wrong! Visitor Entry not Done!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      router.refresh();
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
      tiggerFocus();
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
            onClick={() => toggleVisitorType("studentEmployee")}
          >
            Student/Employee
          </Button>
          <Button
            className="sm:w-full md:w-[200px]"
            onClick={() => toggleVisitorType("others")}
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
            {visitorType === "studentEmployee" && (
              <FormField
                control={form.control}
                name="visitorPrn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student PRN/ Employee ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Student PRN number / Employee ID"
                        {...field}
                        ref={inputRef} 
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
                          placeholder="Enter Visitor Name"
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
                          placeholder="Enter Visitor Mobile No."
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
                        attendees.map((attendee) => (
                          <SelectItem key={attendee.id} value={attendee.id}>
                            {attendee.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
                      placeholder="Enter Query"
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
