import { getServerSession } from "next-auth";
import { endOfDay, startOfDay } from "date-fns";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getVisitorsStats = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  

  try {
    const totalVisitors = await prismaClient.visitors.aggregate({
      _count: {
        _all: true,
      },
    });

    const fromDate = startOfDay(new Date()).toISOString();
    const toDate = endOfDay(new Date()).toISOString();

    const currentVisitorStats = await prismaClient.visitors.aggregate({
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: new Date(fromDate),
          lte: new Date(toDate),
        },
      },
    });

    return [
      {
        label: "Total Visitors",
        value: totalVisitors._count._all,
      },
      {
        label: "Today's Visitors",
        value: currentVisitorStats._count._all,
      },
    ];
  } catch (error) {
    console.log("VISITOR_STATS_ERROR");
    console.log(error);
  }
};
