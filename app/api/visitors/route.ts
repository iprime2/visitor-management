import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { fromDate, toDate } = await req.json();

    const visitors = await prismaClient.visitor.findMany({
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
