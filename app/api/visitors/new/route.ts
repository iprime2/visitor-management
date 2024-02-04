import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

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
    console.log("[VISITOR_POST_FETCH_ERROR]");
    console.log("Error:", error);
  }
}
