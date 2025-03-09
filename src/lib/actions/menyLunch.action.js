"use server";
import MenuLunch from "@/models/menuLunch.model";
import { connectMongoDB } from "../mymongodb";

export async function setTitle(mytitle) {
  try {
    console.log("title", mytitle);
    const filter = { _id: 1 };
    const update = { title: mytitle };
    const options = { upsert: true };

    connectMongoDB();

    const updateTitle = await MenuLunch.findOneAndUpdate(
      filter,
      update,
      options
    );
    console.log(updateTitle);
  } catch (error) {
    console.log("my error", error);
  }
}

export async function setDescription(description) {
  try {
    const filter = { _id: 1 };
    const update = { description: description };
    const options = { upsert: true };

    connectMongoDB();

    const updateTitle = await MenuLunch.findOneAndUpdate(
      filter,
      update,
      options
    );
    console.log(updateTitle);
  } catch (error) {
    console.log("my error", error);
  }
}

export async function setImage(url) {
  try {
    const filter = { _id: 1 };
    const update = { img: url };
    const options = { upsert: true };

    connectMongoDB();

    const updateTitle = await MenuLunch.findOneAndUpdate(
      filter,
      update,
      options
    );
    console.log(updateTitle);
  } catch (error) {
    console.log("my error", error);
  }
}

export async function setOpen(start, end) {
  try {
    const filter = { _id: 1 };
    const update = { opening_hours: { start: start, end: end } };
    const options = { upsert: true };

    connectMongoDB();

    const updateTitle = await MenuLunch.findOneAndUpdate(
      filter,
      update,
      options
    );
    console.log(updateTitle);
  } catch (error) {
    console.log("my error", error);
  }
}

export async function getTitle() {
  try {
    const featchTitle = await MenuLunch.find().lean();

    return JSON.parse(JSON.stringify(featchTitle[0]));
  } catch (error) {
    console.log("my error", error);
  }
}
