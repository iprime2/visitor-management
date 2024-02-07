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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import CustomModal from "./CustomModal";

import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Separator } from "../ui/separator";
import ClipLoader from "react-spinners/ClipLoader";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FrownIcon, LaughIcon, SmileIcon } from "lucide-react";

interface FeedbackModalProps {}

const feedbackFormSchema = z.object({
  message: z.string(),
  rating: z.enum(["Poor", "Good", "Excellent"], {
    required_error: "You need to select a notification type.",
  }),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const FeedbackModal: FC<FeedbackModalProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const feedbackModal = useFeedbackModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      message: "",
      rating: "Good",
    },
  });

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      setLoading(true);
      await axios.post("/api/feedback", data);

      toast({
        title: "Feedback Submitted!",
        variant: "success",
      });
      feedbackModal.onClose();
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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Rating</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Poor" />
                        {/* <RadioGroupItem value="Poor" icon={FrownIcon} /> */}
                      </FormControl>
                    </FormItem>
                    {/* <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Good" icon={SmileIcon} />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Excellent" icon={LaughIcon} />
                      </FormControl>
                    </FormItem> */}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Enter your feedback here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-3" disabled={loading}>
            {loading && (
              <ClipLoader
                className="font-extrabold text-gray-50 dark:text-slate-800"
                size={22}
              />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col items-center justify-center">
      Thanks For visiting MITWPU.
    </div>
  );

  return (
    <CustomModal
      title="Feedback"
      disabled={loading}
      onSubmit={onSubmit}
      isOpen={feedbackModal.isOpen}
      onClose={feedbackModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default FeedbackModal;
