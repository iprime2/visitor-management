"use client"

import { FC } from "react";

import AttendeeForm from "./components/AttendeeForm";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axioswrapper";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";

interface AttendeePageProps {
  params: { attendeeId: string };
}

const AttendeePage: FC<AttendeePageProps> = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [attendee, setAttendee] = useState(null);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/attendees/${params.attendeeId}`);
        if (response.status === 200) {
          setAttendee(response.data);
          toast({
            title: "Success!",
            description: "Attendees data fetched!",
            variant: "success",
          });
        }
      } catch (error: any) {
        if (error?.response?.data) {
          toast({
            title: error?.response?.data?.error,
            description: error?.response?.data?.message,
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

    if(params.attendeeId !== "new") fetchUsers();
  }, []);


  return <AttendeeForm initialData={attendee} />;
};

export default AttendeePage;
