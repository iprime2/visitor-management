import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const visitors = await prismaClient.visitor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(visitors);
  } catch (error) {
    console.log("GET_visitorS");
    console.log("Error:" + error);
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new Response("NAME MISSING", { status: 400 });
    }

    const visitor = await prismaClient.visitor.create({
      data: {
        visitorName: name,
      },
    });

    if (!visitor) {
      return new Response("Visitor Not Created", { status: 500 });
    }

    return NextResponse.json(visitor);
  } catch (error) {
    console.log("[VISITOR_POST]");
    console.log("Error:", error);
  }
}
