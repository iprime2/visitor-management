"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addDays, endOfDay, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import * as XLSX from "xlsx";

import { DataTable } from "@/components/DataTable";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import BodyWrapper from "@/components/BodyWrapper";
import ClipLoader from "react-spinners/ClipLoader";
import RecordsEntryForm from "@/components/RecordsEntryForm";
import { recordColumns } from "@/components/recordsColumn";

const Records = () => {
  const [visitors, setVisitors] = useState();
  const [loading, setLoading] = useState<boolean>(false);

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
      const res = await axios.post(`/api/records`, finalDate);
      setVisitors(res.data);
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

  const downloadData = () => {
    try {
      setLoading(true);
      if (visitors) {
        // Convert data to Excel file
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(visitors);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const data = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = "visitors.xlsx";
        link.click();
        toast({
          description: "File Downloaded",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("DOWNLOAD_FILE_ERROR");
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
      <div>
        <RecordsEntryForm fetchData={fetchData} />
      </div>
      <div className="flex flex-col w-full">
        <p className="md:text-xl lg:text2xl sm:text-md">Select Date</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button className="w-full" onClick={fetchData} disabled={loading}>
            Submit
          </Button>
          <Button className="w-full" onClick={downloadData} disabled={loading}>
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
            columns={recordColumns}
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
