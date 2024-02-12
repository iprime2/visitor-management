"use client";

import { useEffect, useState } from "react";
import { endOfDay, startOfDay } from "date-fns";
import axios from "axios";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { DataTable } from "@/components/DataTable";
import BodyWrapper from "@/components/BodyWrapper";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { ClipLoader } from "react-spinners";
import downloadData from "@/lib/DownloadData";
import { DateRange } from "react-day-picker";

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | any | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    setLoading(true);
    const fromDate = startOfDay(date.from).toISOString();
    const toDate = date.to && endOfDay(date.to).toISOString();

    const finalDate = {
      fromDate,
      toDate,
    };
    try {
      const res = await axios.post(`/api/feedback/reports`, finalDate);
      setFeedbacks(res.data);
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

  return (
    <BodyWrapper>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col">
          <Heading title="Feedbacks" description="Manage feedback" />
        </div>
        <Separator />
        <p className="md:text-xl lg:text2xl sm:text-md">Select Date</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button className="w-full" onClick={fetchData} disabled={loading}>
            Submit
          </Button>
          <Button
            className="w-full"
            onClick={() => downloadData(setLoading, "feedbacks", feedbacks)}
            disabled={loading}
          >
            Download
          </Button>
        </div>
        <div className="w-full items-center">
          {loading ? (
            <div className="w-full h-auto md:p-3 mt-4 flex items-center justify-center">
              <ClipLoader
                loading={loading}
                size={200}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : feedbacks ? (
            <DataTable columns={columns} data={feedbacks} searchKey="name" />
          ) : (
            <h3>Select The Date!!</h3>
          )}
        </div>
      </div>
    </BodyWrapper>
  );
};

export default FeedbacksPage;
