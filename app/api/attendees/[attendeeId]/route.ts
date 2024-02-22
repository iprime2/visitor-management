import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { prismaClient } from "@/lib/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { attendeeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { attendeeId } = params;

    if (!attendeeId) {
      return new NextResponse("attendee Id is required", { status: 400 });
    }

    const attendee = await prismaClient.attendee.findUnique({
      where: {
        id: attendeeId,
      },
    });

    if (!attendee) {
      return new NextResponse("Use not found!!", {
        status: 400,
      });
    }

    return NextResponse.json(attendee, { status: 200 });
  } catch (error) {
    console.log("[ATTENDEE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { attendeeId: string } }
) {
  try {
    const { attendeeId } = params;

    const { name, sequence } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    if (!attendeeId) {
      return new NextResponse("attendee Id is required", { status: 400 });
    }

    if (!name || !sequence) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const attendeeExists = await prismaClient.attendee.findUnique({
      where: {
        id: attendeeId,
      },
    });

    if (!attendeeExists) {
      return new NextResponse("attendee not found", { status: 400 });
    }

    const sequenceInt = parseInt(sequence, 10);

    const attendee = await prismaClient.attendee.updateMany({
      where: {
        id: attendeeId,
      },
      data: {
        name,
        sequence: sequenceInt,
      },
    });

    return NextResponse.json(attendee, { status: 200 });
  } catch (error) {
    console.log("[ATTENDEE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { attendeeId: string } }
) {
  try {
    const { attendeeId } = params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("UnAuthorized!!", { status: 401 });
    }

    if (!attendeeId) {
      return new NextResponse("attendee Id is required", { status: 400 });
    }

    const department = await prismaClient.attendee.delete({
      where: {
        id: attendeeId,
      },
    });

    return NextResponse.json(department, { status: 200 });
  } catch (error: any) {
    console.error("[ATTENDEE_DELETE]", error);
    return new NextResponse(error, { status: 500 });
  }
}
