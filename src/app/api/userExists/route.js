import { connectMongoDB } from "@/lib/mymongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("haha");
    await connectMongoDB();
    console.log("haha");

    const { email } = await req.json();
    const user = await User.findOne({ email });
    console.log("user ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
