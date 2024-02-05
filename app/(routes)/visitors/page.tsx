"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { endOfDay, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/DataTable";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { visitorColumns } from "@/components/visitorsColumns";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import BodyWrapper from "@/components/BodyWrapper";
import ClipLoader from "react-spinners/ClipLoader";
import downloadData from "@/lib/DownloadData";
import { useForm } from "react-hook-form";
import EntryForm from "@/components/Form";
import { VisitorsFormValues, visitorFormSchema } from "@/lib/formSchema";

const Records = () => {
  const [visitors, setVisitors] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<VisitorsFormValues>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: { name: "" },
  });

  const [date, setDate] = React.useState<DateRange | any | undefined>({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const fromDate = startOfDay(date.from).toISOString();
    const toDate = date.to && endOfDay(date.to).toISOString();

    const finalDate = {
      fromDate,
      toDate,
    };
    try {
      const res = await axios.post(`/api/visitors`, finalDate);
      setVisitors(res.data);
      toast({
        description: "Data Fetched",
        variant: "success",
      });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      toast({
        description: "Something went wrong!!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: VisitorsFormValues) => {
    setLoading(true);

    try {
      await axios.post(`/api/visitors/new`, data);
      toast({
        description: "Entry done!",
        variant: "success",
      });
      router.refresh();
      fetchData();
      // window.location.reload();
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
    <BodyWrapper>
      <div>
        <EntryForm
          formName={"name"}
          formLabel={"Visitor Name"}
          formPlaceholder={"Enter the visitor name"}
          onSubmit={onSubmit}
          form={form}
          loading={loading}
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="md:text-xl lg:text2xl sm:text-md">Select Date</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button className="w-full" onClick={fetchData} disabled={loading}>
            Submit
          </Button>
          <Button
            className="w-full"
            onClick={() => downloadData(setLoading, "visitors", visitors)}
            disabled={loading}
          >
            Download
          </Button>
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="w-full h-auto md:p-3 mt-4 flex items-center justify-center">
            <ClipLoader
              loading={loading}
              size={200}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : visitors ? (
          <DataTable
            columns={visitorColumns}
            data={visitors}
            searchKey="visitorName"
          />
        ) : (
          <h3>Select The Date!!</h3>
        )}
      </div>
    </BodyWrapper>
  );
};

export default Records;
