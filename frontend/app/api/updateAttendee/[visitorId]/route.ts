import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { visitorId: string } }
) {
  const { visitorId } = params;
  const { name } = await req.json();
  console.log(name);

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthenticated!!", { status: 401 });
  }

  try {
    const attendee = await prismaClient.attendee.findFirst({
      where: {
        name: name,
      },
    });

    const updateAttendee = await prismaClient.visitors.update({
      where: {
        id: visitorId,
      },
      data: {
        attendedBy: attendee?.name,
        attendeeId: attendee?.id,
      },
    });

    return NextResponse.json(updateAttendee, { status: 200 });
  } catch (error) {
    console.log("[ATTENDEE_VISITOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
