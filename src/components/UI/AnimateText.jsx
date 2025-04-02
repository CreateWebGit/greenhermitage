"use client";
import React, { useContext } from "react";
import { motion, useInView } from "framer-motion";
import { Message_data } from "@/context/context";

const AnimateText = () => {
  const { inLanguage, setLanguage } = useContext(Message_data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1 }}
      className=" flex items-center justify-center mt-[-70px] w-[90%] h-[200px] m-auto z-50 bg-[#F2EEE4] rounded-md border shadow-md md:w-[600px] md:mt-[-100px]"
    >
      <p className="w-[350px] text-center">
        {inLanguage === "sv"
          ? " Vi jobbar ständigt med att förbättra den planet vi lever på och jobbar i miljöns tecken. Därför är upp till"
          : "We are constantly working to improve the planet we live on and work in the name of the environment. Therefore, it is up to"}{" "}
        <span className="text-[#DE803D]">
          {inLanguage === "sv"
            ? "50% av våra rätter ekologiska."
            : "50% of our dishes are organic."}
        </span>
      </p>
    </motion.div>
  );
};

export default AnimateText;
