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
// import { visitorColumns } from "@/components/visitorsColumns";
import getVisitorColumns from "@/components/visitorsColumns";
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
import { FormDescription } from "@/components/ui/form";
import { useFileUploadModal } from "@/hooks/useFileUploadModal";
import axiosInstance from "@/lib/axioswrapper";

type rowSelectionType = {
  [key: number]: boolean;
};

const ReportsPage = () => {
  const [visitors, setVisitors] = useState<Visitors[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = React.useState<DateRange | any | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [visitorType, setVisitorType] = useState<string>("all");
  const [statusType, setStatusType] = useState<string>("all");
  const [mounted, setMounted] = useState<boolean>(false);
  const fileUploadModal = useFileUploadModal();
  const columns: any = getVisitorColumns(fileUploadModal);

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
      statusType,
    };
    try {
      const res = await axiosInstance.post(`/visitors/search`, finalDate);
      console.log(res);
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
        feedbackUrl: `${process.env.FEEDBACK_URL}/${visitorId}`,
      })
    );
    downloadData(setLoading, "visitors", finalData);
  };

  const updateClosed = async (rowSelection: rowSelectionType) => {
    setLoading(true);
    const fromDate = startOfDay(date.from).toISOString();
    const toDate = date.to && endOfDay(date.to).toISOString();

    try {
      let response;
      if (Object.keys(rowSelection)?.length > 0) {
        let closeVisitorIds = [];
        for (const key in rowSelection) {
          if (Object.prototype.hasOwnProperty.call(rowSelection, key)) {
            if (key) {
              closeVisitorIds.push(visitors[key].id);
            }
          }
        }
        response = await axiosInstance.patch(`/visitors/closesome`, {
          closeVisitorIds,
          fromDate, 
          toDate
        });
      } else {
        response = await axiosInstance.patch(`/visitors/closeall`, {fromDate, toDate});
      }

      if (response?.status === 200) {
        toast({
          description: "Data Fetched",
          variant: "success",
        });
      }
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
        <div className="lg:flex md:gap-4 sm:gap-4 w-full lg:flex-row flex-row">
          <div className="w-full">
            <p className="md:text-md lg:text-lg sm:text-sm">Select Date</p>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="w-full">
            <p className="md:text-md lg:text-lg sm:text-sm">Select category</p>
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
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <p className="md:text-md lg:text-lg sm:text-sm">Select status</p>
            <Select
              onValueChange={(value) => setStatusType(value)}
              defaultValue={statusType}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col">
            <p className="w-full md:text-md lg:text-lg sm:text-sm">
              Click to process{" "}
            </p>
            <div className="w-full">
              <Button className="w-full" onClick={fetchData} disabled={loading}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
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
            columns={columns}
            data={visitors}
            searchKey="visitorName"
            updateClosed={updateClosed}
            downloadDataFn={downloadDataFn}
            loading={loading}
            rightVisible={true}
          />
        ) : (
          <h3>Select The Date!!</h3>
        )}
      </div>
    </BodyWrapper>
  );
};

export default ReportsPage;
