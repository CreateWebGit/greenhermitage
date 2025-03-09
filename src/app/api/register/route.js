import { connectMongoDB } from "@/lib/mymongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log("jjj");
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();

    await User.create({ name, email, password: hashedPassword });
    console.log(hashedPassword);
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    console.log("haha", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
