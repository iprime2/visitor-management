import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rating, message, visitorId } = await req.json();

    if (!rating || !message || !visitorId) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const feedback = await prismaClient.feedback.create({
      data: {
        rating,
        message,
        visitorId,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {}
}
