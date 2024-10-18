"use client"

import BodyWrapper from "@/components/BodyWrapper";
import EntryForm from "@/components/EntryForm";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axioswrapper";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";

const VisitorsPage = async () => {
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState<any[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/attendees");
        if (response.status === 200) {
          setAttendees(response.data);
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

    fetchUsers();
  }, []);

  return (
    <BodyWrapper>
      <div>
        <EntryForm attendees={attendees} type="public" />
      </div>
    </BodyWrapper>
  );
};

export default VisitorsPage;
