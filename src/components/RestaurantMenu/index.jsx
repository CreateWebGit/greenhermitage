"use client";
import React, { useState } from "react";
import { cn } from "@/utils/utils";
import styles from "./style.module.scss";
import { v4 as uuidv4 } from "uuid";

const RestaurantMenu = ({ menuData }) => {
  console.log(menuData);
  const [isCurrentCategory, setCurrentCategory] = useState(0);
  console.log("myINdex", isCurrentCategory);
  return (
    <div className={styles.container}>
      <div className={styles.categoryBar}>
        {menuData.map((item, index) => (
          <div
            className={cn(
              " inline-block cursor-pointer font-forum text-[20px] tracking-widest capitalize",
              index == isCurrentCategory ? "text-[#1e1e22]" : "text-[#87879E]"
            )}
            key={index}
            onClick={() => setCurrentCategory(index)}
          >
            {item.categoryName.toLowerCase()}
          </div>
        ))}
      </div>
      <div className={styles.menuWrapper}>
        {menuData.map(
          (categoryItem, index) =>
            index === isCurrentCategory && (
              <div key={categoryItem.categoryID}>
                <h2 className="text-xl font-bold mb-2">
                  {categoryItem.categoryName}
                </h2>
                {categoryItem.products.map((item, index) => (
                  <div className="mb-12" key={item._id}>
                    <div className="ea-grid" key={index}>
                      <div className="flex justify-between ea-col-9 ea-col-xs-9">
                        <p className=" font-forum text-2xl">{item.title}</p>
                      </div>
                      <div className=" font-giestsans text-lg ea-col-3 ea-col-xs-3">
                        <p className=" text-right" key={index}>
                          {item.price} SEK
                        </p>
                      </div>
                    </div>
                    <div>{item.description}</div>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
