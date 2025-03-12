"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CircularScrollMotion() {
  const ref = useRef(null);

  // Get scroll progress inside the ref container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Track visibility in viewport
  });

  // Define circular motion path
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]); // Move on X-axis
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Move on Y-axis
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]); // Rotate

  return (
    <div ref={ref} className="h-[200vh] flex items-center justify-center">
      <motion.div style={{ x, y, rotate }} className="w-16 h-16 bg-blue-500 " />
    </div>
  );
}
