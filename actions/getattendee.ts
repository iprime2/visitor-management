import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getAttendee = async (attendeeId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return "not authorized";
    }

    const attendee = await prismaClient.attendee.findUnique({
      where: {
        id: attendeeId,
      },
    });

    if (!attendee) {
      return null;
    }

    return attendee;
  } catch (error) {
    console.log("GETATTENDEE_ACTIONS");
    console.log(error);
  }
};
