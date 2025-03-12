"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimateText = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1 }}
      className=" flex items-center justify-center mt-[-100px] w-[90%] h-[200px] m-auto z-50 bg-[#F2EEE4] rounded-md border shadow-md md:w-[600px]"
    >
      <p className="w-[350px] text-center">
        Vi jobbar ständigt med att förbättra den planet vi lever på och jobbar i
        miljöns tecken. Därför är upp till{" "}
        <span className="text-[#DE803D]">50% av våra rätter ekologiska.</span>
      </p>
    </motion.div>
  );
};

export default AnimateText;
