"use client";
import { Logo } from "@/components/Navbar/Logo";
import React, { useContext } from "react";
import AnimateText from "../AnimateText";
import { Message_data } from "@/context/context";
import Button from '../../Button'

const Header = () => {
  const { inLanguage, setLanguage } = useContext(Message_data);
  return (
    <section className="gh-section--hero">
      <div className="hero-content">
        {/* asdasd */}
        <img src="/home/google_reviews.svg"/>
        <img src="/home/hermitage_logo_complete.svg"/>
        <p>
          {inLanguage === "sv" 
          ? "Vi erbjuder vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan i Stockholm. Till oss ska den med hunger gå. Känner du att det kurrar i magen? Styr då din kosa hit och njut av vår vegetariska buffé." 
          : "We offer vegetarian food made with love in a cozy setting in Gamla Stan, Stockholm. If you’re hungry, this is the place to be. Feeling your stomach growl? Then head our way and enjoy our vegetarian buffet."}
        </p>
        <div className="button-container my-0 flex justify-center gap-4">
          <Button url="/boka">
            {inLanguage === "sv" ? "Boka bord" : "Book a table"}
          </Button>
          <Button url="/lunch-meny" dark={false}>
            {inLanguage === "sv" ? "Vår meny" : "Our menu menu"}
          </Button>
        </div>
      </div>
    </section>
  )

  return (
    <header className="hero z-40 relative ">
      <div className=" w-full h-full bg-black/50 flex flex-col  items-center text-white z-50 ">
        <div className=" w-full text-center md:w-[700px]">
          <div className=" mt-[100px] flex justify-center z-50">
            <Logo />
          </div>

          <h2 className=" font-forum text-xl tracking-[.5em] md:text-2xl mt-[50px]">
            {inLanguage === "sv"
              ? "VEGETARISKA RESTAURANG"
              : "VEGETARIAN RESTAURANT"}
          </h2>

          <p className=" font-giestsans">
            {inLanguage === "sv"
              ? "Vi erbjuder vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan i Stockholm. Till oss ska den med hun njut av vår vegetariska buffé."
              : "We offer vegetarian food cooked with love in a pleasant environment in the Old Town of Stockholm. Come to us and enjoy our vegetarian buffet."}
          </p>
          <div className="flex flex-col justify-center items-center w-full z-50 mt-[30px]">
            <div className="flex justify-center items-center w-full z-50">
              <div className="w-[48px] h-[48px] bg-black rounded-full flex justify-center items-center">
                <img src="/home/Arrow1.png" alt="" />
              </div>
              <p className=" z-50">
                {inLanguage === "sv"
                  ? "Över 100+ nöjda vegetarianer!"
                  : "Over 100+ satisfied vegetarians!"}
              </p>
            </div>
            <img
              className=" mt-[-22px] ml-[38px]"
              src="/home/ReviewGoogle.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <AnimateText />
      <div className=" absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-[-1] " />
    </header>
  );
};

export default Header;
