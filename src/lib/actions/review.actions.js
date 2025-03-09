"use server";

import { ObjectId } from "bson";
import Ratings from "../../models/ratings.model";
import { connectMongoDB } from "../mymongodb";
import mongoose from "mongoose";

export async function createReview({ id, rating, name, comment }) {
  try {
    console.log({ rating, name, comment });
    connectMongoDB();

    const createReview = await Ratings.create([
      {
        id,
        rating,
        name,
        comment,
      },
    ]);
  } catch (error) {
    console.log("My error", error);
  }
}

export async function createReviewComment(id, comment) {
  try {
    console.log({ id, comment });

    const filter = { _id: id };
    const update = { adminComment: comment };

    connectMongoDB();

    const createReview = await Ratings.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("My error", error);
  }
}

export async function updateExtandedReview(id) {
  try {
    console.log({ id });
    connectMongoDB();

    const createReview = await Ratings.findOneAndUpdate({ _id: id }, [
      { $set: { expanded: { $eq: [false, "$expanded"] } } },
    ]);
  } catch (error) {
    console.log("My error", error);
  }
}

export async function updateHighlightReview(id, highlight) {
  try {
    const filter = { id: id };
    const update = { highlights: highlight };
    console.log(filter);
    connectMongoDB();

    const createReview = await Ratings.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("My error", error);
  }
}

export async function fetchReviews() {
  console.log("jaja");
  connectMongoDB();
  console.log("jaja");

  let featchReviews = await Ratings.find().lean();
  console.log("jaja");

  console.log(featchReviews);

  return JSON.parse(JSON.stringify(featchReviews));
}

export async function fetchHighlightReviews() {
  connectMongoDB();

  let featchReviews = await Ratings.find({ highlights: true }).lean();

  console.log(featchReviews);

  return JSON.parse(JSON.stringify(featchReviews));
}
