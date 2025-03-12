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
        <section
          className="bg-[url('/lunch-menu/header.jpg')] w-full h-[500px] bg-cover flex items-center justify-center relative"
          style={{ backgroundPosition: "top -200px right 0px" }}
        >
          <div className=" absolute top-0 bottom-0 right-0 left-0 bg-black/50" />
          <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] text-[128px]">
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
