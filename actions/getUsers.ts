import { getServerSession } from "next-auth";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUsers = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

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
    console.log("VISITOR_STATS_ERROR");
    console.log(error);
  }
};
