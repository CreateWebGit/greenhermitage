import { connectMongoDB } from "@/lib/mymongodb";
import Profile from "@/models/profile";

export async function GET(req, context) {
  connectMongoDB();

  const profile = await Profile.findOne().lean();

  return Response.json(profile);
}
