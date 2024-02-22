"use client";
import { endOfDay, startOfDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import axios from "axios";

import BodyWrapper from "@/components/BodyWrapper";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { DataTable } from "@/components/DataTable";
import { visitorColumns } from "@/components/visitorsColumns";
import downloadData from "@/lib/DownloadData";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { Visitors } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportsPage = () => {
  const [visitors, setVisitors] = useState<Visitors[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = React.useState<DateRange | any | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [visitorType, setVisitorType] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const fromDate = startOfDay(date.from).toISOString();
    const toDate = date.to && endOfDay(date.to).toISOString();

    const finalDate = {
      fromDate,
      toDate,
      visitorType,
    };
    try {
      const res = await axios.post(`/api/reports`, finalDate);
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

  if (!mounted) {
    return null;
  }

  const downloadDataFn = () => {
    const finalData = visitors?.map(
      ({
        visitorId,
        visitorName,
        mobile,
        type,
        attendedBy,
        query,
        status,
        remark,
        inTime,
        outTime,
      }) => ({
        visitorId,
        visitorName,
        mobile,
        type,
        attendedBy,
        query,
        status,
        remark,
        inTime,
        outTime,
      })
    );
    downloadData(setLoading, "visitors", finalData);
  };

  const updateClosed = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/reports/closed`);
      console.log(res.data);
      toast({
        description: "Data Fetched",
        variant: "success",
      });
      fetchData();
    } catch (error: any) {
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

  return (
    <BodyWrapper>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex flex-col">
          <Heading title="Reports" description="Manage Reports" />
        </div>
        <Separator />
        <p className="md:text-xl lg:text2xl sm:text-md">Select Date</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <DatePickerWithRange date={date} setDate={setDate} />
          <div className="w-full">
            <Select
              onValueChange={(value) => setVisitorType(value)}
              defaultValue={visitorType}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a visitor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={fetchData} disabled={loading}>
            Submit
          </Button>
          <Button
            className="w-full"
            onClick={() => downloadDataFn()}
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
            updateClosed={updateClosed}
            loading={loading}
          />
        ) : (
          <h3>Select The Date!!</h3>
        )}
      </div>
    </BodyWrapper>
  );
};

export default ReportsPage;
