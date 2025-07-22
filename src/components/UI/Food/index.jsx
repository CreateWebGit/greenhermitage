"use client";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Message_data } from "@/context/context";

const Food = () => {
  const ref = useRef(null);

  const { inLanguage, setLanguage } = useContext(Message_data);
  console.log("language", inLanguage);

  // Get scroll progress inside the ref container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Track visibility in viewport
  });

  // Define circular motion path
  const x = useTransform(scrollYProgress, [0, 1], [0, 0]); // Move on X-axis
  const y = useTransform(scrollYProgress, [0, 1], [0, 0]); // Move on Y-axis
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]); // Rotate

  return (
    <section className={styles.foodSection}>
      <div ref={ref} className={styles.headerText}>
        <span>{inLanguage === "sv" ? "Maten" : "Food"}</span>
        <h2 className="whitespace-pre-line">
          {inLanguage === "sv"
            ? "Vår passion för växtbaserad \n matlagning"
            : "Our passion for plant-based \n cooking"}
        </h2>
      </div>
      <div className={[styles.foodContainer, "ea-grid"].join(" ")}>
        <div
          className={[styles.foodTextWrapper, "ea-col-6 ea-col-xs-12"].join(
            " "
          )}
        >
          <p>
            {inLanguage === "sv"
              ? "På Hermitage, tror vi på att ge näring till både kropp och själ. Vår meny är omsorgsfullt gjord med färska, säsongsbetonade råvaror från lokala gårdar. Oavsett om du är en livslång vegetarian eller bara utforskar en växtbaserad kost, erbjuder vi något för alla smaker."
              : "At Hermitage, we believe in nourishing both body and soul. Our menu is carefully crafted with fresh, seasonal ingredients from local farms. Whether you're a lifelong vegetarian or just exploring a plant-based diet, we offer something for every taste."}
          </p>
        </div>

        <div
          className={[styles.foodImageWrapper, "ea-col-6 ea-col-xs-12"].join(
            " "
          )}
        >
          <motion.img style={{ x, y, rotate }} src="/home/vegmeal.webp" alt="" />
        </div>
      </div>

      <div className={styles.greenImage}></div>
    </section>
  );
};

export default Food;
