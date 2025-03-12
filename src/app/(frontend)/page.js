import Navbar from "@/components/Navbar";
import Recensioner from "@/components/UI/Recensioner";
import Food from "@/components/UI/Food";
import { fetchHighlightReviews } from "@/lib/actions/review.actions";
import MapComponent from "@/components/GoogleMap";
import { motion } from "framer-motion";
import AnimateText from "@/components/UI/AnimateText";
import { Logo } from "@/components/Navbar/Logo";

const Page = async () => {
  const reviewHighLightData = await fetchHighlightReviews();
  console.log("reviewData", reviewHighLightData);
  return (
    <div className=" bg-[#F2EEE3]">
      <Navbar />
      <header className="hero z-40 relative">
        <div className=" w-full h-full bg-black/50 flex flex-col justify-center items-center text-white z-50">
          <div className=" w-[700px] text-center">
            <div className="flex justify-center items-center w-full z-50">
              <img className=" mr-[-8px]" src="/home/Ellipse1.png" alt="" />
              <img className=" mr-[-8px]" src="/home/Ellipse2.png" alt="" />
              <img className=" mr-[-8px]" src="/home/Ellipse3.png" alt="" />
              <div className="w-[48px] h-[48px] bg-black rounded-full flex justify-center items-center">
                <img src="/home/Arrow1.png" alt="" />
              </div>
              <p className=" z-50">Över 100+ nöjda vegetarianer!</p>
            </div>
            <div className=" my-8 flex justify-center z-50">
              <Logo />
            </div>
            <h2 className=" font-forum text-xl tracking-[.5em] md:text-2xl">
              VEGETARISKA RESTAURANG
            </h2>
            ger gå. Känner du att det kurrar i magen? Styr då din kosa hit och
            <p className=" font-giestsans">
              Vi erbjuder vegetarisk mat lagad med kärlek i en trevlig miljö i
              Gamla Stan i Stockholm. Till oss ska den med hun njut av vår
              vegetariska buffé.
            </p>
          </div>
        </div>
        <AnimateText />
        <div className=" absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-[-1] " />
      </header>

      <Food />
      <Recensioner reviewHighLightData={reviewHighLightData} />
      <section className=" py-32 m-auto border">
        <div className="flex ">
          <div className="w-full">
            <span className="text-[#de803d;]">KURRAR DET I MAGEN?</span>
            <h2
              style={{ fontFamily: "var(--font-caveat)" }}
              className="text-[90px] absolute w-[900px] z-50 leading-[0.75]"
            >
              Till oss ska den med hunger gå.
            </h2>
            <p className="text-[#3d4338] mt-[200px]">
              Kom och ät på våran “all you can eat”-buffé. Du hittar oss på
              Stora Nygatan 11 i hjärtat av Gamla stan. På sommartid har vi
              öppet vardagar 11:00 - 21:00. Under vintern har vi öppet 11:00 -
              20:00.
            </p>
          </div>
          <div className="w-full">
            <MapComponent />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
