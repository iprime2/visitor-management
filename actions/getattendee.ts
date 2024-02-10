import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prismaClient } from "@/lib/prismaClient";

export const getAttendee = async (attendeeId: string) => {
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
};
