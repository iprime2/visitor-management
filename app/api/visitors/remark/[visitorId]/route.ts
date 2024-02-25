import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(
  req: Request,
  { params }: { params: { visitorId: string } }
) {
  try {
    const { visitorId } = params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const visitorRemark = await prismaClient.visitors.findFirst({
      where: {
        id: visitorId,
      },
      select: {
        remark: true,
      },
    });

    return NextResponse.json(visitorRemark);
  } catch (error) {
    console.log("[CLOSED_POST_ERROR]");
    console.error("Error:", error);
  }
}
