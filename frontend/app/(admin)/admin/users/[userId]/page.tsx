import { FC } from "react";

import UserForm from "./components/UserForm";
import { getUser } from "@/actions/getUser";
import Error401 from "@/components/401";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const userId = params.userId;

  const usersData = await getUser(userId);

  if (usersData === "not authorized") {
    return <Error401 />;
  }

  const plainUsersData = JSON.parse(JSON.stringify(usersData));

  return <UserForm initialData={plainUsersData} />;
};

export default UserPage;
