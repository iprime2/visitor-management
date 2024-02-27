import { prismaClient } from "./prismaClient";

export async function updateOutTime() {
  try {
    const updatedVisitors = await prismaClient.visitors.updateMany({
      where: {
        out: false,
      },
      data: {
        out: true,
        outTime: new Date(),
      },
    });
    console.log(updatedVisitors);
  } catch (error) {
    console.error("CORN_JOB_ERROT");
    console.error(error);
  }
}
