import { prismaClient } from "@/lib/prismaClient";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { to, from } = await req.json();

  try {
    const fromDate = startOfDay(from).toISOString();
    const toDate = to && endOfDay(to).toISOString();
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
      return new Response("NAME MISSING", { status: 404 });
    }

    return NextResponse.json(visitors);
  } catch (error) {
    console.log("GET_VISITORS");
    console.log("Error:" + error);
  }
}
