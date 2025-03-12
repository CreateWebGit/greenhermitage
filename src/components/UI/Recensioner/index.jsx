"use client";
import React from "react";
import styles from "./styles.module.scss";
import SlideShow from "../../SlideShow2";
import Button from "../../Button";
import EmblaCarousel from "@/components/Slide";
import { motion, useInView } from "framer-motion";
import CircularScrollMotion from "@/components/CircularScrollMotion";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Recensioner = ({ reviewHighLightData }) => {
  return (
    <section className="bg-[#F2EEE3] py-[75px] pt:mt-[50px]">
      <div className="">
        <div className="text-center my-6">
          <span className="font-Inter text-[#DE803D]">RECENSIONER</span>
          <h2 className=" font-Caveat text-[5.625rem] leading-[1em] text-[#5F6952]">
            Vad våra gäster säger
          </h2>
        </div>
        <div className=" ea-grid ">
          <div
            className={[
              styles.reviewTextContainer,
              "ea-col-6 ea-col-xs-12 ",
            ].join(" ")}
          >
            <EmblaCarousel slides={reviewHighLightData} options={OPTIONS} />
          </div>
          <div
            className={[
              styles.reviewImagesContainer,
              "ea-col-6 ea-col-xs-12 w-full m-auto ",
            ].join(" ")}
          >
            <div className="flex items-end gap-4">
              <motion.img
                initial={{ opacity: 0, y: -50, x: -50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-300px 0px -300px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image1}
                src="/home/group/Rectangle1.png"
                alt=""
              />
              <motion.img
                initial={{ opacity: 0, y: -50, x: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-300px 0px -300px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image2}
                src="/home/group/Rectangle2.png"
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
                src="/home/group/Rectangle3.png"
                alt=""
              />
              <motion.img
                initial={{ opacity: 0, y: 50, x: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 1 }}
                className={styles.image4}
                src="/home/group/Rectangle4.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="my-16 flex justify-center gap-4">
          <Button url="/boka">Boka bord</Button>
          <Button url="/recensioner" dark={false}>
            Se fler recensioner
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Recensioner;
