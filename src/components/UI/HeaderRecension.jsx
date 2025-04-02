"use client";
import React, { useContext } from "react";
import { Message_data } from "@/context/context";

const HeaderRecension = () => {
  const { inLanguage, setLanguage } = useContext(Message_data);
  return (
    <section className="bg-[url('/recentioner/header.jpeg')] bg-[center_top_0rem]  w-full h-[300px] bg-cover flex items-end justify-center md:h-[500px] md:bg-[center_top_58rem] md:items-center">
      <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] mb-4 text-[60px] leading-[1.5] md:text-[128px] md:mb-0">
        {inLanguage === "sv"
          ? "Hur var upplevelsen?"
          : "How was the experience?"}
      </h1>
    </section>
  );
};

export default HeaderRecension;
