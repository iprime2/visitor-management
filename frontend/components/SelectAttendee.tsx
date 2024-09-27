"use client";

import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { ClipLoader } from "react-spinners";

type Attendee = {
  id: number;
  name: string;
};

type SelectAttendeeTypeProps = {
  attendeeSelectedValueProps: string;
  visitorUniqueId: string;
};

const SelectAttendee: FC<SelectAttendeeTypeProps> = ({
  attendeeSelectedValueProps,
  visitorUniqueId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<Attendee[] | null | undefined>(
    null
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const [attendeeSelectedValue, setAttendeeSelectedValue] =
    useState<string>("NAN");

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAttendee();
    setAttendeeSelectedValue(attendeeSelectedValueProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAttendee = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/attendees");
      setAttendees(response.data);
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
  }, []);

  const updateAttendee = useCallback(async (data: string) => {
    setLoading(true);
    const finalData = { name: data };
    try {
      const res = await axios.patch(
        `/api/updateAttendee/${visitorUniqueId}`,
        finalData
      );
      toast({
        description: "Attendee updated",
        variant: "success",
      });
      setAttendeeSelectedValue(res.data.attendedBy as string);
      console.log(res);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {loading ? (
        <ClipLoader
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Select
          onValueChange={(selectedValue) => updateAttendee(selectedValue)}
          defaultValue={attendeeSelectedValue}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                attendees && attendees?.length > 0
                  ? `Select an attendee`
                  : "Not found"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {attendees &&
              attendees?.map((attendee) => (
                <SelectItem key={attendee.id} value={attendee.name}>
                  {attendee.name ? attendee.name : "NAN"}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default SelectAttendee;
