import { prismaClient } from "@/lib/prismaClient";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getAttendees = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return "not authorized";
  }

  try {
    const attendees = await prismaClient.attendee.findMany({
      select: {
        id: true,
        name: true,
        sequence: true,
        createdAt: true,
      },
      orderBy: {
        sequence: "asc",
      },
    });

    if (!attendees) {
      return null;
    }

    return attendees;
  } catch (error) {
    console.log("GET_ATTENDEES_ERROR");
    console.log(error);
  }
};
