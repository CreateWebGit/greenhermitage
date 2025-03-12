import BookingForm from "@/components/BookingForm";
import Navbar from "@/components/Navbar";
import Recensioner from "@/components/UI/Recensioner";
import { fetchHighlightReviews } from "@/lib/actions/review.actions";

export default async function Home() {
  const reviewHighLightData = await fetchHighlightReviews();
  return (
    <div className="bg-[#F2EEE3]">
      <div className=" bg-siteBackground ">
        <Navbar />
        <section
          className="bg-[url('/book/header.jpeg')] w-full h-[500px] bg-cover flex items-center justify-center"
          style={{ backgroundPosition: "bottom -1150px right 0px" }}
        >
          <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] text-[128px]">
            Boka bord
          </h1>
        </section>

        <BookingForm />
      </div>
      <Recensioner reviewHighLightData={reviewHighLightData} />
    </div>
  );
}
