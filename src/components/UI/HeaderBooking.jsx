"use client";
import React from "react";
import Navbar from "../Navbar";
import { useContext } from "react";
import BookingForm from "@/components/BookingForm";
import { Message_data } from "@/context/context";

const HeaderBooking = ({ menuPublishedData }) => {
  const { inLanguage, setLanguage } = useContext(Message_data);
  return (
    <div className=" bg-siteBackground ">
      <Navbar menuPublishedData={menuPublishedData} />

      <section
        className="bg-[url('/book/header.jpeg')] bg-[center_top_-2rem] z-0 w-full h-[300px] bg-cover flex flex-col items-center justify-center md:h-[500px] md:bg-[center_top_-20rem] relative"
        //style={{ backgroundPosition: "bottom -1150px right 0px" }}
      >
        <div className=" absolute top-0 bottom-0 right-0 left-0 bg-black/50" />
        <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] text-[70px] md:text-[128px]">
          {inLanguage === "sv" ? "Boka bord" : "Book a table"}
        </h1>
        <BookingForm />
      </section>
    </div>
  );
};

export default HeaderBooking;
