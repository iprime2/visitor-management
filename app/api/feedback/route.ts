import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rating, message, visitorId } = await req.json();

    if (!rating || !message || !visitorId) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const visitorExists = await prismaClient.visitors.findUnique({
      where: {
        id: visitorId,
      },
    });

    if (!visitorExists) {
      return new NextResponse("Visitor not found!!", { status: 400 });
    }

    const feedback = await prismaClient.feedback.create({
      data: {
        rating,
        message,
        visitorId,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.log("[FEEDBACK_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
