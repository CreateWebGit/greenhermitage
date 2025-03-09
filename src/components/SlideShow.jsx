"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import StarRating from "./Review/StarRating";
import moment from "moment";

const text = [
  {
    rate: 5,
    resension:
      "Ett mycket trevligt ställe med god mat, lugn atmosfär och väldigt trevlig personal. Rekommenderas starkt!",
  },
  {
    rate: 4,
    resension: "Massa massa massa text 2",
  },
  {
    rate: 5,
    resension: "Massa massa massa text 3",
  },
  {
    rate: 4,
    resension: "Massa massa massa text 4",
  },
];

const SlideShow = ({ reviewHighLightData }) => {
  console.log(reviewHighLightData);
  const [isCurrentIndex, setCurrentIndex] = useState(0);

  const convertDateToDate = (theDate) => {
    const date = moment(theDate).format("DD / MM - YYYY");
    return date;
  };

  const clickNext = () => {
    isCurrentIndex === reviewHighLightData.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(isCurrentIndex + 1);
    console.log(isCurrentIndex);
    console.log(reviewHighLightData.length);
  };

  const clickPrev = () => {
    isCurrentIndex === 0
      ? setCurrentIndex(reviewHighLightData.length - 1)
      : setCurrentIndex(isCurrentIndex - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full border">
      <div className=" flex flex-col ">
        {reviewHighLightData.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === isCurrentIndex
                ? "flex flex-col items-center justify-center font-Caveat text-[2.25rem] h-[100%]"
                : "hidden"
            }`}
          >
            <StarRating isRating={item.rating} onlyView={true} iconSize={16} />
            <div className="mt-4 mb-2 font-Caveat text-colorComment">{`"${item.comment}"`}</div>
            <div className=" font-Inter text-colorComment">{item.name}</div>
            <div className=" text-[8px] font-Inter">
              {convertDateToDate(item.date)}
            </div>
          </div>
        ))}

        <div className="flex gap-4 self-end">
          <div className="bg-[#EBE7DC] rounded-full p-2 cursor-pointer">
            <ChevronLeft onClick={clickPrev} />
          </div>
          <div className="bg-[#EBE7DC] rounded-full p-2 cursor-pointer">
            <ChevronRight onClick={clickNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
