import BookingForm from "@/components/BookingForm";
import Navbar from "@/components/Navbar";
import Recensioner from "@/components/UI/Recensioner";
import { fetchHighlightReviews } from "@/lib/actions/review.actions";

import HeaderBooking from "@/components/UI/HeaderBooking";
import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";

export default async function Home() {
  const reviewHighLightData = await fetchHighlightReviews();
  const menuPublishedData = await fetchMenuPublished();

  return (
    <div className="bg-[#F2EEE3] overflow-hidden">
      <HeaderBooking menuPublishedData={menuPublishedData} />
      <Recensioner reviewHighLightData={reviewHighLightData} />
    </div>
  );
}
