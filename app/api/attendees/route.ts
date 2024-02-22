import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const attendees = await prismaClient.attendee.findMany({
      orderBy: {
        sequence: "asc",
      },
    });

    return NextResponse.json(attendees);
  } catch (error) {
    console.log("[ATTENDEES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    // if (!session.isAdmin) {
    //   return new NextResponse("Unauthenticated!!", { status: 401 });
    // }

    const { name, sequence } = await req.json();

    if (!name || !sequence) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }


    const attendee = await prismaClient.attendee.create({
      data: {
        name,
        sequence,
      },
    });

    return NextResponse.json(attendee, { status: 201 });
  } catch (error) {
    console.log("[ATTENDEES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
