"use server";
import MenuPublished from "@/models/menuPublished.model";
import { connectMongoDB } from "../mymongodb";

export async function fetchMenuPublished() {
  connectMongoDB();

  const featchMenuPublished = await MenuPublished.find().lean();

  return JSON.parse(JSON.stringify(featchMenuPublished[0].published));
}

export async function updateMenuPublished(isPublished) {
  connectMongoDB();

  try {
    const filter = { _id: 1 };
    const update = { published: isPublished };

    connectMongoDB();

    const createReview = await MenuPublished.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("My error", error);
  }
}
