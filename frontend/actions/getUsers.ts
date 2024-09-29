import { getServerSession } from "next-auth";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUsers = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return null;
  // }

  try {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!users) {
      return ["No User Found!"];
    }

    return users;
  } catch (error) {
    console.log("GET_USERS_ERROR");
    console.log(error);
  }
};
