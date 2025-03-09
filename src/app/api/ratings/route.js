import { connectMongoDB } from "@/lib/mymongodb";
import Ratings from "@/models/ratings.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("req.json");
  try {
    const tt = await req.json();
    console.log(tt);

    await connectMongoDB();

    await Ratings.create({
      tt,
    });

    return NextResponse.json(
      { message: "Profile registered" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

/*

export async function GET() {
  connectMongoDB();

  const ratings = Ratings.findOne().lean();

  console.log(Ratings);

  return Response.json(ratings);
}
  */
