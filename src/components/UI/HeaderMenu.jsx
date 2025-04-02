"use client";
import React, { useContext } from "react";
import { Message_data } from "@/context/context";

const HeaderMenu = () => {
  const { inLanguage, setLanguage } = useContext(Message_data);
  return (
    <section
      className="bg-[url('/menu/header.png')] w-full h-[300px] bg-cover flex items-end justify-center relative md:h-[500px] md:items-center"
      style={{ backgroundPosition: "top 0px right 0px" }}
    >
      <div className=" absolute top-0 bottom-0 right-0 left-0 bg-black/50" />
      <h1 className=" font-Caveat text-center text-[70px] mb-12 z-50 text-[#EFE7D2] md:text-[128px] md:mb-0">
        {inLanguage === "sv" ? "Á la certe meny" : "Á la certe menu"}
      </h1>
    </section>
  );
};

export default HeaderMenu;
