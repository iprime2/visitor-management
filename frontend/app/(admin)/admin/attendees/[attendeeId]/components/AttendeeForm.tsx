"use client";

import { FC, useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import AlertModal from "@/components/modal/AlertModal";
import BodyWrapper from "@/components/BodyWrapper";
import { AttendeeColumnType } from "../../components/columns";
import axiosInstance from "@/lib/axioswrapper";

const formSchema = z.object({
  name: z.string().min(1),
  sequence: z.string().transform((value) => parseInt(value)),
});

type AttendeeFormValues = z.infer<typeof formSchema>;

interface AttendeeFormPops {
  initialData: AttendeeColumnType | any | null;
}

const AttendeeForm: FC<AttendeeFormPops> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Attendee" : "Create Attendee";
  const description = initialData ? "Edit a Attendee" : "Add new Attendee";
  const toastMessage = initialData
    ? "Attendee updated!!"
    : "Attendee Created!!";
  const action = initialData ? "Save changes" : "Create";

  const params = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<AttendeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      sequence: 0,
    },
  });

  if (!mounted) {
    return null;
  }

  const onSubmit = async (data: AttendeeFormValues) => {
    setLoading(true);
    let response;
    try {
      if (initialData) {
        response = await axiosInstance.patch(
          `/attendees/${params?.attendeeId}`,
          data
        );
      } else {
        response = await axiosInstance.post(`/attendees`, data);
      }
      router.refresh();
      router.push("/admin/attendees");
      if (response.status === 201 || response.status === 200) {
        toast({
          description: toastMessage,
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
        toast({
          title: error.response?.data?.error,
          description: error.response?.data?.message,
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

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/attendees/${params?.attendeeId}`);
      router.refresh();
      router.push(`/admin/attendees`);
      if (response.status === 200) {
        toast({
          description: "User Deleted!",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        description: "Something went wrong!!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BodyWrapper>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name of user"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sequence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sequence</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter sequence"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto gap-2" type="submit">
            {loading && <ClipLoader color="white" size="20" />} {action}
          </Button>
        </form>
      </Form>
    </BodyWrapper>
  );
};

export default AttendeeForm;
