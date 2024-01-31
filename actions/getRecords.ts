import { prismaClient } from "@/lib/prismaClient";

export const getRecords = async () => {
  try {
    const records = await prismaClient.record.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return records;
  } catch (error) {
    console.log("GET_RECORDS");
    console.log("Error:" + error);
  }
};
