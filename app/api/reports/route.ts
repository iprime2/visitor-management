import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: Request) {
  try {
    const { fromDate, toDate } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const visitors = await prismaClient.visitors.findMany({
      where: {
        createdAt: {
          gte: new Date(fromDate),
          lte: new Date(toDate),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!visitors) {
      return new Response("Visitor Not Created", { status: 500 });
    }

    return NextResponse.json(visitors);
  } catch (error) {
    console.log("[VISITORS_POST_CREATE_ERROR]");
    console.error("Error:", error);
  }
}
