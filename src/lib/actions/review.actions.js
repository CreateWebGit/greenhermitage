"use server";

import Ratings from "../../models/ratings.model";
import { connectMongoDB } from "../mymongodb";

export async function createReview({ id, rating, name, comment }) {
  try {
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

    connectMongoDB();

    const createReview = await Ratings.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("My error", error);
  }
}

export async function fetchReviews() {
  connectMongoDB();

  let featchReviews = await Ratings.find().lean();

  return JSON.parse(JSON.stringify(featchReviews));
}

export async function fetchHighlightReviews() {
  connectMongoDB();

  let featchReviews = await Ratings.find({ highlights: true }).lean();

  return JSON.parse(JSON.stringify(featchReviews));
}
