"use client";
import React, { useState } from "react";
import axios from "axios";
import { addDays, endOfDay, format, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

import { DataTable } from "@/components/DataTable";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { columns } from "@/components/columns";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

const Records = () => {
  const [visitors, setVisitors] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = React.useState<DateRange | any | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/visitors/date`, date);
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

  return (
    <div className="w-full h-screen p-4 flex flex-col items-center">
      <div className="flex gap-4 w-full lg:w-[60%]">
        <DatePickerWithRange date={date} setDate={setDate} />
        <Button className="w-full" onClick={fetchData} disabled={loading}>
          Submit
        </Button>
        <Button className="w-full" disabled={loading}>
          Download
        </Button>
      </div>
      <div className="w-full lg:w-[60%] p-4">
        {visitors ? (
          <DataTable
            columns={columns}
            data={visitors}
            searchKey="visitorName"
          />
        ) : (
          <h3>Select The Date!!</h3>
        )}
      </div>
    </div>
  );
};

export default Records;
