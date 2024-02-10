import { prismaClient } from "@/lib/prismaClient";

export const getAttendees = async () => {
  try {
    const attendees = await prismaClient.attendee.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (!attendees) {
      return null;
    }

    return attendees;
  } catch (error) {
    console.log("ATTENDEES_GET_ERROR");
    console.log(error);
  }
};
