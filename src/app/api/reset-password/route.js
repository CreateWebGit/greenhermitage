import { connectMongoDB } from "@/lib/mymongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { password, email } = await req.json();

  console.log("token");

  await connectMongoDB();

  const exisistingUser = await User.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 5);
  exisistingUser.password = hashedPassword;

  exisistingUser.resetToken = undefined;
  exisistingUser.resetTokenExpiry = undefined;

  try {
    await exisistingUser.save();
    return new NextResponse("User's password is updated.", { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
}
