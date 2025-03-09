import { fetchReviews } from "@/lib/actions/review.actions";
import React from "react";
import moment from "moment";
import ReviewBackend from "@/components/ReviewBackend";

const page = async () => {
  const reviewData = await fetchReviews();
  console.log(reviewData);
  const d = new Date(reviewData[0]?.date);
  console.log();
  var day = moment(d, "DD MM YYYY hh:mm:ss");
  const date = moment(d).format("YYYY-MM-DD");
  const time = moment(d).format("HH:mm:ss");
  console.log(date);
  console.log(time);
  return (
    <div>
      <ReviewBackend data={reviewData} />
    </div>
  );
};

export default page;
