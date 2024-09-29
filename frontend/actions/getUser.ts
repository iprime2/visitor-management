import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prismaClient } from "@/lib/prismaClient";

export const getUser = async (userId: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    user.password = "";

    return user;
  } catch (error) {
    console.log("GET_USER_ERROR");
    console.log(error);
  }
};
