import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const visitors = await prismaClient.visitors.updateMany({
      where: {
        status: "open",
      },
      data: {
        status: "closed",
      },
    });

    return NextResponse.json(visitors, { status: 200 });
  } catch (error) {
    console.log("[CLOSED_POST_ERROR]");
    console.error("Error:", error);
  }
}
