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
import ClipLoader from "react-spinners/ClipLoader";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const feedbackFormSchema = z.object({
  message: z.string(),
  rating: z.enum(["Poor", "Good", "Excellent"], {
    required_error: "You need to select a notification type.",
  }),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

type FeedbackFormProps = {
  visitorId: string;
};

const FeedbackForm: FC<FeedbackFormProps> = ({ visitorId }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      message: "",
      rating: "Good",
    },
  });

  if (!mounted) {
    return null;
  }

  const onSubmit = async (data: FeedbackFormValues) => {
    const finalData = { ...data, visitorId };
    try {
      setLoading(true);
      const res = await axios.post("/api/feedback", finalData);
      toast({
        title: "Feedback Submitted!",
        variant: "success",
      });
      form.reset();
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

  return (
    <div>
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
                      <FormItem className="flex items-center justify-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="Poor" />
                        </FormControl>
                        <FormLabel className="font-normal items-center justify-center">
                          Bad
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center justify-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="Good" />
                        </FormControl>
                        <FormLabel className="font-normal">Good</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center justify-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="Excellent" />
                        </FormControl>
                        <FormLabel className="font-normal">Excellent</FormLabel>
                      </FormItem>
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
              {loading && <ClipLoader color="white" size="20" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FeedbackForm;
