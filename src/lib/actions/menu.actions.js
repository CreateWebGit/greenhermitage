"use server";

import Profile from "@/models/profile";
import Ratings from "../../models/ratings.model";
import { connectMongoDB } from "../mymongodb";

export async function fetchMenu() {
  connectMongoDB();

  const featchMenu = await Profile.find().lean();

  console.log(featchMenu[0].productsList);

  return JSON.parse(JSON.stringify(featchMenu[0].productsList));
}
