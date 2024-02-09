import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const attendees = await prismaClient.attendee.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (!attendees) {
      return new Response("Attendee Not Created", { status: 500 });
    }

    return NextResponse.json(attendees, { status: 200 });
  } catch (error) {
    console.log("ATTENDEE_GET_ERROR");
    console.log(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const { name, visitorUniqueId } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    if (!name || !visitorUniqueId) {
      return new Response("Attendee Name or Visitor unique Id Not Found!", {
        status: 500,
      });
    }

    const attendee = await prismaClient.attendee.findFirst({
      where: {
        name,
      },
    });

    if (!attendee) {
      return new Response("Attendee Not Found!", { status: 500 });
    }

    await prismaClient.visitors.update({
      where: {
        id: visitorUniqueId,
      },
      data: {
        attendedBy: name,
        attendeeId: attendee.id,
      },
    });

    return NextResponse.json(attendee, { status: 200 });
  } catch (error) {
    console.log("ATTENDEE_GET_ERROR");
    console.log(error);
  }
}
