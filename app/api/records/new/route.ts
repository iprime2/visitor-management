import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prn } = await req.json();

    if (!prn) {
      return new Response("PRN IS MISSING", { status: 400 });
    }

    const recordExists = await prismaClient.record.findMany({
      where: {
        visitorPrn: prn,
        out: false,
      },
    });

    if (recordExists.length > 0) {
      const updateRecord = await prismaClient.record.updateMany({
        where: {
          visitorPrn: prn,
        },
        data: {
          out: true,
          outTime: new Date(),
        },
      });

      return NextResponse.json(updateRecord, { status: 200 });
    }

    const studentAndEmployee = await prismaClient.studentAndEmployee.findFirst({
      where: {
        prn,
      },
    });

    if (!studentAndEmployee) {
      return new Response("PRN NOT FOUND", { status: 404 });
    }

    const record = await prismaClient.record.create({
      data: {
        StudentAndEmployeeId: studentAndEmployee?.id,
        visitorPrn: prn,
        visitorName: studentAndEmployee?.name,
      },
    });

    if (!record) {
      return new Response("Record Not Created", { status: 500 });
    }

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.log("[RECORD_POST]");
    console.log("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
