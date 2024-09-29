"use client";

import Link from "next/link";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { DataTable } from "@/components/DataTable";
import BodyWrapper from "@/components/BodyWrapper";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axioswrapper";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";
import useUserStore from "@/stores/useUserStore";

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/users");
        if (response.status === 200) {
          setUsers(response.data);
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

    fetchUsers();
  }, []);

  return (
    <BodyWrapper>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col">
          <Heading title="Users" description="Manage users" />
          <div className="w-full flex">
            <Link href="/admin/users/new">
              <Button className="rounded-md">Create</Button>
            </Link>
          </div>
        </div>
        <Separator />
        <div className="w-full items-center">
          {loading ? (
            <Loader />
          ) : (
            users &&
            // @ts-ignore
            <DataTable columns={columns} data={users} searchKey="name" />
          )}
        </div>
      </div>
    </BodyWrapper>
  );
};

export default UsersPage;
