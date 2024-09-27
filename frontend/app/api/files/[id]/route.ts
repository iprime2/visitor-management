import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const visitorFiles = await prismaClient.visitors.findUnique({
      where: {
        id: id,
      },
      select: {
        files: true,
      },
    });
    return NextResponse.json(visitorFiles, { status: 200 });
  } catch (error) {
    console.log("[FILES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { fileName, filePath } = await req.json();
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const newFile = await prismaClient.files.create({
      data: {
        fileName,
        filePath,
        visitorId: id,
      },
    });
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log("[FILES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const deletedFile = await prismaClient.files.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedFile, { status: 200 });
  } catch (error) {
    console.log("[FILES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
