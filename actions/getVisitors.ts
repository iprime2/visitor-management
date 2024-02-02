import { prismaClient } from "@/lib/prismaClient";
import { redisClient } from "@/lib/redisClient";

export const getVisitors = async () => {
  try {
    const keyExists = await redisClient.exists("visitorData");
    if (keyExists) {
      const visitors = await redisClient.get("visitorData");
      return visitors;
    }

    const visitors = await prismaClient.visitor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    await redisClient.del("visitorData");
    await redisClient.set("visitorData", visitors);

    return visitors;
  } catch (error) {
    console.log("GET_VISITORS");
    console.log("Error:" + error);
  }
};
