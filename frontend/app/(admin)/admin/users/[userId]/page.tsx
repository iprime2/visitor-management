"use client"
import { FC, useEffect, useState } from "react";

import UserForm from "./components/UserForm";
import useUserStore from "@/stores/useUserStore";
import axiosInstance from "@/lib/axioswrapper";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: FC<UserPageProps> = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/${params.userId}`);
        if (response.status === 200) {
          setUserData(response.data);
          toast({
            title: "Success!",
            description: "Users data fetched!",
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

    if(params?.userId !== "new") fetchUsers();
  }, []);


  return <UserForm initialData={userData} />;
};

export default UserPage;
