import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prismaClient";

export async function POST(req: Request, res: Response) {
  try {
    const { seedData } = await req.json();
    const createdStudents = await prismaClient.data.createMany({
      data: seedData,
    });
    return NextResponse.json(createdStudents);
  } catch (error) {
    console.error("Error seeding data:", error);
    return new Response("Error seeding data", { status: 500 });
  }
}

export async function DELETE() {
  try {
    const collegeDataCount = await prismaClient.data.count();
    if (collegeDataCount === 0) {
      return new Response("No data to delete", { status: 400 });
    }
    const deletedCollegeData = await prismaClient.data.deleteMany({});
    return NextResponse.json(deletedCollegeData);
  } catch (error) {
    console.error("Error deleting data:", error);
    return new Response("Error deleting data", { status: 500 });
  }
}
