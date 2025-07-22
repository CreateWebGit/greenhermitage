import Navbar from "@/components/Navbar";
import { getAllLuch } from "@/lib/actions/menyLunch.action";
import Image from "next/image";

export default async function Home() {
  const lunchData = await getAllLuch();
  console.log(lunchData);
  return (
    <div className="w-full  bg-[#F2EEE3]">
      <div className=" bg-siteBackground ">
        <Navbar />
        <section className=" bg-[url('/lunch-menu/header.webp')] bg-[center_top_1rem] w-full h-[300px] bg-cover flex items-end justify-center relative md:h-[500px] md:bg-[center_top_-15rem] md:items-center">
          <div className=" absolute top-0 bottom-0 right-0 left-0 bg-black/50 " />
          <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] mb-12 text-[80px] md:text-[128px] md:mb-0">
            Lunch meny
          </h1>
        </section>
        <section>
          <div className=" text-center text-2xl py-16">{lunchData.title}</div>
          <div className="flex justify-center">
            <Image
              src={lunchData.img}
              alt="lunch menu"
              width={800}
              height={300}
              className=" rounded-xl"
            />
          </div>
          <div className=" py-16">{lunchData.description}</div>
        </section>
      </div>
    </div>
  );
}
