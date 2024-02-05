"use client";

import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";

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
import { VisitorsFormValues, inoutFormValues } from "@/lib/formSchema";

type EntryFormPropsType = {
  formName: string;
  formLabel: string;
  formPlaceholder: string;
  onSubmit: (data: any) => void;
  form: UseFormReturn<any>;
  loading: boolean;
};

const EntryForm: FC<EntryFormPropsType> = ({
  formName,
  formLabel,
  formPlaceholder,
  onSubmit,
  form,
  loading,
}) => {
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name={formName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formLabel}.</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={formPlaceholder}
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

export default EntryForm;
