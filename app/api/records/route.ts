import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fromDate, toDate } = await req.json();

    const records = await prismaClient.record.findMany({
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

    if (!records) {
      return new Response("record Not Created", { status: 500 });
    }

    return NextResponse.json(records);
  } catch (error) {
    console.log("[RECORDS_POST_CREATE_ERROR]");
    console.error("Error:", error);
  }
}
