"use client";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import SlideShow from "../../SlideShow2";
import Button from "../../Button";
import EmblaCarousel from "@/components/Slide";
import { motion, useInView } from "framer-motion";
import { Message_data } from "@/context/context";
import { cn } from "@/lib/utils";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Recensioner = ({ reviewHighLightData, frontpage }) => {
  const { inLanguage, setLanguage } = useContext(Message_data);
  return (
    <section
      className={cn(
        frontpage ? "mt-[20px] md:mt-[50px]" : "mt-[450px] md:mt-[150px]",
        "bg-[#F2EEE3] py-[75px]  overflow-hidden mx-auto "
      )}
    >
      <div className=" w-[100%]">
        <div className=" ea-grid ">
          <div
            className={[
              styles.reviewTextContainer,
              "ea-col-6 ea-col-xs-12 ",
            ].join(" ")}
          >
            <div className="text-left ml-0 my-6 md:ml-28  ">
              <span className="font-Inter text-[#DE803D]">
                {inLanguage === "sv" ? "RECENSIONER" : "REVIEWS"}
              </span>
              <h2 className=" font-Caveat text-[60px] leading-[1em] text-[#5F6952] md:text-[90px]">
                {inLanguage === "sv" ? "Våra gäster säger" : "Our guests says"}
              </h2>
            </div>
            <EmblaCarousel slides={reviewHighLightData} options={OPTIONS} />
          </div>
          <div
            className={[
              styles.reviewImagesContainer,
              "ea-col-6 ea-col-xs-12 w-full m-auto mt-16 md:mt-0 ",
            ].join(" ")}
          >
            <div className="flex items-end gap-4">
              <motion.img
                initial={{ opacity: 0, y: -50, x: -50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-300px 0px -300px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image1}
                src="/home/group/Rectangle1.webp"
                alt=""
              />
              <motion.img
                initial={{ opacity: 0, y: -50, x: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-300px 0px -300px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image2}
                src="/home/group/Rectangle2.webp"
                alt=""
              />
            </div>
            <div className="flex items-start gap-4 mt-4">
              <motion.img
                initial={{ opacity: 0, y: 50, x: -50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px 100px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image3}
                src="/home/group/Rectangle3.webp"
                alt=""
              />
              <motion.img
                initial={{ opacity: 0, y: 50, x: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image4}
                src="/home/group/Rectangle4.webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="my-16 flex justify-center gap-4">
          <Button url="/boka">
            {inLanguage === "sv" ? "Boka bord" : "Book a table"}
          </Button>
          <Button url="/recensioner" dark={false}>
            {inLanguage === "sv" ? "Se fler recensioner" : "See more reviews"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Recensioner;
