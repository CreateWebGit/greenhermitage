import Navbar from "@/components/Navbar";
import Recensioner from "@/components/UI/Recensioner";
import Food from "@/components/UI/Food";
import { fetchHighlightReviews } from "@/lib/actions/review.actions";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/UI/Header";
import NavTest from "@/components/NavTest";

const Page = async () => {
  const reviewHighLightData = await fetchHighlightReviews();

  return (
    <div className="bg-[#F2EEE3]">
      {/* <Navbar /> */}
      <NavTest/>

      <Header />

      <Food />

      <Recensioner reviewHighLightData={reviewHighLightData} frontpage={true} />

      <ContactSection />
    </div>
  );
};

export default Page;
