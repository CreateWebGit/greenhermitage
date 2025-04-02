import React from "react";
import Review from "@/components/Review";
import { fetchReviews } from "@/lib/actions/review.actions";
import Navbar from "@/components/Navbar";
import { Message_data } from "@/context/context";
import HeaderRecension from "@/components/UI/HeaderRecension";
import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";

const page = async () => {
  const reviews = await fetchReviews();
  const menuPublishedData = await fetchMenuPublished();
  return (
    <div className="relative bg-[#F2EEE3]">
      <Navbar menuPublishedData={menuPublishedData} />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-black/50" />
      <HeaderRecension />

      <div className="">
        <Review reviews={reviews} />
      </div>
    </div>
  );
};

export default page;
