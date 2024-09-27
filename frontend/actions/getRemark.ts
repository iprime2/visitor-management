
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prismaClient } from "@/lib/prismaClient";

export const getRemark = async (visitorId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return "not authorized";
    }

    const remark = await prismaClient.visitors.findUnique({
      where: {
        id: visitorId,
      },
      select: {
        remark: true,
      },
    });

    if (!remark) {
      return null;
    }

    return remark;
  } catch (error) {
    console.log("GET_REMARK_ERROR");
    console.log(error);
  }
};
