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
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import BodyWrapper from "@/components/BodyWrapper";
import ClipLoader from "react-spinners/ClipLoader";
import { recordColumns } from "@/components/recordsColumn";
import downloadData from "@/lib/DownloadData";
import { useForm } from "react-hook-form";
import EntryForm from "@/components/Form";
import { inoutFormSchema, inoutFormValues } from "@/lib/formSchema";

const Records = () => {
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange | any | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const form = useForm<inoutFormValues>({
    resolver: zodResolver(inoutFormSchema),
    defaultValues: { prn: "" },
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
      const res = await axios.post(`/api/records`, finalDate);
      setRecords(res.data);
      setTimeout(() => {
        toast({
          description: "Data Fetched",
          variant: "success",
        });
      }, 4000);
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

  const onSubmit = async (data: inoutFormValues) => {
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
    <BodyWrapper>
      <div>
        <EntryForm
          formName={"prn"}
          formLabel={"PRN NO."}
          formPlaceholder={"Enter the prn number"}
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
            onClick={() => downloadData(setLoading, "inout", records)}
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
        ) : records ? (
          <DataTable
            columns={recordColumns}
            data={records}
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
