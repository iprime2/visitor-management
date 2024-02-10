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

type Attendee = {
  id: number;
  name: string;
};

type SelectAttendeeTypeProps = {
  attendeeSelectedValue: string;
  visitorUniqueId: string;
};

const SelectAttendee: FC<SelectAttendeeTypeProps> = ({
  attendeeSelectedValue,
  visitorUniqueId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<Attendee[] | null | undefined>(
    null
  );

  useEffect(() => {
    getAttendee();
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
    try {
      const response = await axios.patch(`/api/attendees`, {
        name: data,
        visitorUniqueId: visitorUniqueId,
      });
      toast({
        description: "Attendee updated",
        variant: "success",
      });
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

  return (
    <Select
      onValueChange={(selectedValue) => updateAttendee(selectedValue)}
      defaultValue={attendeeSelectedValue}
      disabled={loading}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            attendees && attendees?.length > 0
              ? `Select a attendee`
              : "Not found"
          }
        />
      </SelectTrigger>

      <SelectContent>
        {attendees &&
          attendees?.map((attendee) => (
            <SelectItem key={attendee.id} value={attendee.name}>
              {attendee.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectAttendee;
