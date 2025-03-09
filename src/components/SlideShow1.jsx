"use client";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarRating from "./Review/StarRating";
import moment from "moment";
const Slider = ({ reviewHighLightData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = reviewHighLightData?.length;
  //console.log("reviewData", reviewHighLightData);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 2000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const convertDateToDate = (theDate) => {
    const date = moment(theDate).format("DD / MM - YYYY");
    return date;
  };

  return (
    <div className="slider w-[80%] h-[300px] relative">
      {reviewHighLightData?.map((item, index) => {
        return (
          <div
            className={
              index === currentSlide
                ? "translate-[0] transition-all"
                : "translate-[-50%] transition-all"
            }
            key={index}
          >
            {index === currentSlide && (
              <>
                <StarRating
                  isRating={item.rating}
                  onlyView={true}
                  iconSize={16}
                />
                <div className="mt-4 mb-2 font-Caveat text-colorComment">{`"${item.comment}"`}</div>
                <div className=" font-Inter text-colorComment">{item.name}</div>
                <div className=" text-[8px] font-Inter">
                  {convertDateToDate(item.date)}
                </div>
              </>
            )}
          </div>
        );
      })}
      <div className="flex gap-4 self-end absolute bottom-3 right-3">
        <div className="bg-[#EBE7DC] rounded-full p-2 cursor-pointer">
          <ChevronLeft onClick={prevSlide} />
        </div>
        <div className="bg-[#EBE7DC] rounded-full p-2 cursor-pointer">
          <ChevronRight onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
