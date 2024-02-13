import { prismaClient } from "@/lib/prismaClient";

export const getAttendees = async () => {
  try {
    const attendees = await prismaClient.attendee.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
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
