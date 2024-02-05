import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { visitorPrn, visitorName, mobile, attendedBy } = await req.json();

    if (visitorPrn) {
      const data = await prismaClient.data.findFirst({
        where: {
          prn: visitorPrn,
        },
      });

      if (!data) {
        return new Response("PRN NOT FOUND", { status: 404 });
      }

      const visitor = await prismaClient.visitors.create({
        data: {
          dataId: data.id,
          visitorPrn: data.prn,
          visitorName: data.name,
          mobile: data.mobile,
          type: data.type,
          attendedBy,
        },
      });

      return NextResponse.json(visitor);
    } else {
      if (!visitorName) {
        return new Response("NAME IS MISSING", { status: 400 });
      }

      if (!mobile) {
        return new Response("MOBILE IS MISSING", { status: 400 });
      }

      if (!attendedBy) {
        return new Response("ATTENDED BY IS MISSING", { status: 400 });
      }

      const visitor = await prismaClient.visitors.create({
        data: {
          visitorName,
          mobile,
          type: "visitor",
          attendedBy,
        },
      });

      return NextResponse.json(visitor);
    }
  } catch (error) {
    console.log("[VISITORS_POST_CREATE_ERROR]");
    console.error("Error:", error);
  }
}
