"use client";
import React, { useContext, useState } from "react";
import { cn } from "@/utils/utils";
import styles from "./style.module.scss";
import { motion, useInView } from "framer-motion";
import { Message_data } from "@/context/context";

const RestaurantMenu = ({ menuData }) => {
  const [isCurrentCategory, setCurrentCategory] = useState(0);
  const { inLanguage, setLanguage } = useContext(Message_data);

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
            {inLanguage === "sv"
              ? item.categoryName.toLowerCase()
              : item.categoryNameEng?.toLowerCase()}
          </div>
        ))}
      </div>
      <div className={styles.menuWrapper}>
        {menuData.map(
          (categoryItem, index) =>
            index === isCurrentCategory && (
              <motion.div
                key={categoryItem.categoryID}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-xl font-bold mb-2">
                  {inLanguage === "sv"
                    ? categoryItem.categoryName
                    : categoryItem.categoryNameEng}
                </h2>
                {categoryItem.products.map((item, index) => (
                  <div className="mb-12" key={item._id}>
                    <div className="ea-grid" key={index}>
                      <div className="flex justify-between ea-col-9 ea-col-xs-9">
                        <p className=" font-forum text-2xl">
                          {inLanguage === "sv" ? item.title : item.titleEng}
                        </p>
                      </div>
                      <div className=" font-giestsans text-lg ea-col-3 ea-col-xs-3">
                        <p className=" text-right" key={index}>
                          {item.price} SEK
                        </p>
                      </div>
                    </div>
                    <div>
                      {inLanguage === "sv"
                        ? item.description
                        : item.descriptionEng}
                    </div>
                  </div>
                ))}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
