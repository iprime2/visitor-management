import Link from "next/link";

import { getUsers } from "@/actions/getUsers";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { DataTable } from "@/components/DataTable";
import Error401 from "@/components/401";
import BodyWrapper from "@/components/BodyWrapper";

const UsersPage = async () => {
  const users = await getUsers();

  if (!users) {
    return <Error401 />;
  }

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
          {/* @ts-ignore */}
          <DataTable columns={columns} data={users} searchKey="name" />
        </div>
      </div>
    </BodyWrapper>
  );
};

export default UsersPage;
