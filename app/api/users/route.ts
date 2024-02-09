import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { prismaClient } from "@/lib/prismaClient";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const users = await prismaClient.user.findMany({});

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    // if (!session.isAdmin) {
    //   return new NextResponse("Unauthenticated!!", { status: 401 });
    // }

    const { name, email, password, isAdmin } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin && true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[DEPARTMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
