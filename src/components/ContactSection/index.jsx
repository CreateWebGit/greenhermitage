"use client";
import React, { useContext } from "react";
import MapComponent from "@/components/GoogleMap";
import syles from "./style.module.scss";
import { Message_data } from "@/context/context";

const ContactSection = () => {
  const { inLanguage, setLanguage } = useContext(Message_data);
  return (
    <section className=" pb-16 m-auto">
      <div className="flex ea-grid">
        <div className="w-full ea-col-6 ea-col-6 ea-col-xs-12">
          <span className="text-[#de803d;]">
            {inLanguage === "sv"
              ? "KURRAR DET I MAGEN?"
              : "IS YOUR STOMACH RUGGING?"}
          </span>
          <h2
            style={{ fontFamily: "var(--font-caveat)" }}
            className="text-[60px] relative w-full  z-50 leading-[0.75] text-colorTitle md:w-[900px] md:text-[90px] md:absolute"
          >
            {inLanguage === "sv"
              ? "Till oss ska den med hunger gå."
              : "To us shall the one go with hunger."}
          </h2>
          <p className="text-[#3d4338] my-[20px] md:mt-[200px]">
            {inLanguage === "sv"
              ? "Kom och ät på våran “all you can eat”-buffé. Du hittar oss på Stora Nygatan 11 i hjärtat av Gamla stan. På sommartid har vi öppet vardagar 11:00 - 21:00. Under vintern har vi öppet 11:00 - 20:00."
              : "Come and eat at our “all you can eat” buffet. You will find us at Stora Nygatan 11 in the heart of the Old Town. In the summer we are open weekdays 11:00 - 21:00. During the winter we are open 11:00 - 20:00."}
          </p>
        </div>
        <div className="w-full ea-col-6 ea-col-xs-12">
          <MapComponent />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
