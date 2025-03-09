"use client";
import { cn } from "@/utils/utils";
import React, { useState } from "react";

const RestaurantMenuen = ({ menuData }) => {
  const [isCurrentCategory, setCurrentCategory] = useState(0);
  //console.log(isCurrentIndex);
  return (
    <div className=" min-h-screen">
      <div className="w-[1000px] m-auto pt-[130px] flex justify-center gap-3 cursor-pointer ">
        {menuData.map(({ categoryName }, index) => (
          <div
            className={cn(
              " inline-block cursor-pointer font-forum text-[20px] tracking-widest capitalize",
              index == isCurrentCategory ? "text-[#1e1e22]" : "text-[#87879E]"
            )}
            key={index}
            onClick={() => setCurrentCategory(index)}
          >
            {categoryName.toLowerCase()}
          </div>
        ))}
      </div>
      <div className="w-[1000px] m-auto mt-12">
        {menuData.map((categoryItem, index) =>
          index === isCurrentCategory ? (
            <div key={categoryItem.categoryID}>
              {categoryItem.products.map((item, index) => (
                <div className="mb-12" key={index}>
                  <div className="flex justify-between">
                    <div className=" font-forum text-2xl">{item.title}</div>
                    <div key={index}>{item.price} SEK</div>
                  </div>
                  <div className=" font-giestsans text-lg w-[70%]">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuen;
