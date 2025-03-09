import { connectMongoDB } from "@/lib/mymongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function POST(req) {
  const { token } = await req.json();

  console.log(token);

  await connectMongoDB();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  console.log(user);

  if (!user) {
    return new NextResponse("Invalid token or has expired", { status: 400 });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
