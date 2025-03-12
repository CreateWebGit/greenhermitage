"use server";
import Products from "@/models/products.model";
import { connectMongoDB } from "../mymongodb";

export const dynamic = "force-dynamic";
export async function createProduct(data) {
  console.log(data);

  try {
    connectMongoDB();

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    await Products.findOneAndUpdate(
      {},
      {
        products: data,
      },
      options
    );
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProducts() {
  connectMongoDB();

  const fetchProducts = await Products.find().lean();

  return JSON.parse(JSON.stringify(fetchProducts));
}
