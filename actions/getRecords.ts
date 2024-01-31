import { prismaClient } from "@/lib/prismaClient";

export const getVisitors = async () => {
  try {
    const visitors = await prismaClient.visitor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return visitors;
  } catch (error) {
    console.log("GET_VISITORS");
    console.log("Error:" + error);
  }
};
