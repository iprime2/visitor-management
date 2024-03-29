import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fromDate, toDate } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const feedbacks = await prismaClient.feedback.findMany({
      where: {
        createdAt: {
          gte: new Date(fromDate),
          lte: new Date(toDate),
        },
      },
      select: {
        id: true,
        message: true,
        rating: true,
        createdAt: true,
        visitor: {
          select: {
            visitorPrn: true,
            visitorName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!feedbacks) {
      return new NextResponse("No feedback found!!", { status: 400 });
    }

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.log("[FEEDBACK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
