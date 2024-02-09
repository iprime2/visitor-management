import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { visitorPrn, visitorName, mobile, attendedBy, query } =
      await req.json();

    if (visitorPrn) {
      const visitorExists = await prismaClient.visitors.findFirst({
        where: {
          visitorPrn,
          out: false,
          outTime: null,
        },
      });

      if (visitorExists) {
        await prismaClient.visitors.update({
          where: {
            id: visitorExists.id,
          },
          data: {
            out: true,
            outTime: new Date(),
          },
        });

        return NextResponse.json({
          id: visitorExists.id,
          message: "Visitor Checked Out",
          status: 200,
        });
      }
    }

    if (visitorName) {
      const visitorExists = await prismaClient.visitors.findFirst({
        where: {
          visitorName,
          out: false,
          outTime: null,
        },
      });

      if (visitorExists) {
        await prismaClient.visitors.update({
          where: {
            id: visitorExists.id,
          },
          data: {
            out: true,
            outTime: new Date(),
          },
        });

        return NextResponse.json({
          id: visitorExists.id,
          message: "Visitor Checked Out",
          status: 200,
        });
      }
    }

    const attendee = await prismaClient.attendee.findFirst({
      where: {
        name: attendedBy,
      },
    });

    if (!attendee) {
      return new Response("ATTENDEE FIELD IS MISSING, PLEASE SELECT ATTENDEE", {
        status: 400,
      });
    }

    if (!query) {
      return new Response("QUERY IS MISSING, PLEASE PROVIDE YOUR QUERY", {
        status: 400,
      });
    }

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
          attendeeId: attendee.id,
          query,
        },
      });

      return NextResponse.json(visitor, { status: 201 });
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
          attendeeId: attendee.id,
          query,
        },
      });

      return NextResponse.json(visitor, { status: 201 });
    }
  } catch (error) {
    console.log("[VISITORS_POST_CREATE_ERROR]");
    console.error("Error:", error);
  }
}
