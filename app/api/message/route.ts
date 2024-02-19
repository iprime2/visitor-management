import * as twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mobile, visitorId } = await req.json();
  try {
    if (!mobile) {
      return NextResponse.json(
        { message: "Mobile number is required" },
        { status: 400 }
      );
    }

    if (!visitorId) {
      return NextResponse.json(
        { message: "Visitor Id is required" },
        { status: 400 }
      );
    }

    const accountSid: string = process.env.TWILIO_ACCOUNT_SID as string;
    const authToken: string = process.env.TWILIO_AUTH_TOKEN as string;
    const client: any = new twilio.Twilio(accountSid, authToken, {
      logLevel: "debug",
    });

    const res = client.messages.create({
      body: `Thank You for visiting MIT_WPU. Kindly share your experience by providing feedback. Kindly ignore if you have already submitted feedback. ${process.env.URL}/feedback/${visitorId}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${mobile}`,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
