import React from "react";
import Review from "@/components/Review";
import { fetchReviews } from "@/lib/actions/review.actions";
import Navbar from "@/components/Navbar";

const page = async () => {
  const reviews = await fetchReviews();
  return (
    <div className="relative bg-[#F2EEE3]">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-[400px] bg-black/50" />
      <section
        className="bg-[url('/recentioner/header.jpeg')] w-full h-[400px] bg-cover flex items-center justify-center"
        style={{ backgroundPosition: "bottom -1350px right 0px" }}
      >
        <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] text-[128px]">
          Boka bord
        </h1>
      </section>

      <div className="py-12">
        <Review reviews={reviews} />
      </div>
    </div>
  );
};

export default page;
