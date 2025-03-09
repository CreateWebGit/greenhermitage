import Navbar from "@/components/Navbar";
import Recensioner from "@/components/UI/Recensioner";
import Food from "@/components/UI/Food";
import { fetchHighlightReviews } from "@/lib/actions/review.actions";
import MapComponent from "@/components/GoogleMap";

const Page = async () => {
  const reviewHighLightData = await fetchHighlightReviews();
  console.log("reviewData", reviewHighLightData);
  return (
    <div className=" bg-[#F2EEE3]">
      <Navbar />
      <header className="hero z-40">
        <div className=" w-full h-full bg-black/50 flex flex-col justify-center items-center text-white">
          <div className=" w-[700px] text-center">
            <div className="flex justify-center items-center w-full">
              <img className=" mr-[-8px]" src="/home/Ellipse1.png" alt="" />
              <img className=" mr-[-8px]" src="/home/Ellipse2.png" alt="" />
              <img className=" mr-[-8px]" src="/home/Ellipse3.png" alt="" />
              <div className="w-[48px] h-[48px] bg-black rounded-full flex justify-center items-center">
                <img src="/home/Arrow1.png" alt="" />
              </div>
              <p>Över 100+ nöjda vegetarianer!</p>
            </div>
            <h1 className=" font-forum text-7xl md:text-9xl">HERMITAGE</h1>
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
        <div className=" flex items-center justify-center mt-[-100px] w-[90%] h-[200px] m-auto z-50 bg-[#F2EEE4] rounded-md border shadow-md md:w-[600px]">
          <p className="w-[350px] text-center">
            Vi jobbar ständigt med att förbättra den planet vi lever på och
            jobbar i miljöns tecken. Därför är upp till{" "}
            <span className="text-[#DE803D]">
              50% av våra rätter ekologiska.
            </span>
          </p>
        </div>
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
