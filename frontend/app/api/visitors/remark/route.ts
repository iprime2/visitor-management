import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: Request) {
  try {
    const { visitorId, remark } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    if (!visitorId || !remark) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const visitors = await prismaClient.visitors.updateMany({
      where: {
        id: visitorId,
      },
      data: {
        remark,
      },
    });

    return NextResponse.json(visitors);
  } catch (error) {
    console.log("[CLOSED_POST_ERROR]");
    console.error("Error:", error);
  }
}
