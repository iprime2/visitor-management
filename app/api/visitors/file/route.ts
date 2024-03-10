import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function POST(req: Request) {
  try {
    // const formData = await req.formData();
    // const file = formData.getAll("files")[0];
    // const filePath = `./public/file/${file.name}`;
    // await pump(file.stream(), fs.createWriteStream(filePath));
    // const file = formData?.files;
    // console.log(file);
    // const filePath = `./public/file/${file.name}`;
    // await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.log("[FILE_UPLOAD_ERROR]");
    console.error("Error:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
