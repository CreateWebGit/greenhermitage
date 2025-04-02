import { cn } from "@/utils/utils";
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";

const CategoryNamePopup = ({
  isCategoryName,
  setCategoryName,
  isCategoryNameEng,
  setCategoryNameEng,
  isNewCategoryWindowOpen,
  setNewCategoryWindowOpen,
  handleNewSectionSubmit,
  inLanguage,
  setLanguage,
}) => {
  const handleLangSv = (e) => {
    e.stopPropagation();
    setLanguage("sv");
  };

  const handleLangEng = (e) => {
    e.stopPropagation();
    setLanguage("eng");
  };
  return (
    <div
      className="bg-slate-600/70 fixed top-0  bottom-0 left-0 right-0 flex  justify-center items-center z-[0]"
      type="button"
    >
      <div className=" relative bg-white p-8 z-50 ml-36 w-[300px] ">
        <div
          className="absolute top-1 right-1 z-50 cursor-pointer "
          onClick={() => setNewCategoryWindowOpen(false)}
        >
          X
        </div>
        <div className="flex justify-end items-end gap-2 w-full  text-white z-50 ">
          <div
            className={cn(
              "flex relative justify-between items-center px-1 cursor-pointer",
              inLanguage === "sv" ? "border border-slate-500" : ""
            )}
            onClick={handleLangSv}
          >
            <ReactCountryFlag
              className="emojiFlag"
              countryCode="SE"
              style={{
                fontSize: "2em",
              }}
              aria-label="United States"
            />
          </div>
          <div
            className={cn(
              "flex relative justify-between items-center px-1 cursor-pointer",
              inLanguage === "eng" ? "border border-slate-500" : ""
            )}
            onClick={handleLangEng}
          >
            <ReactCountryFlag
              className="emojiFlag"
              countryCode="GB"
              style={{
                fontSize: "2em",
              }}
              aria-label="United States"
            />
          </div>
        </div>
        <div>
          <form onSubmit={handleNewSectionSubmit} className="flex flex-col">
            {inLanguage === "sv" ? (
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={isCategoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                  name="categoryName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Namn på kategori svenska
                </label>
              </div>
            ) : (
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={isCategoryNameEng}
                  onChange={(e) => {
                    setCategoryNameEng(e.target.value);
                  }}
                  name="categoryName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Namn på kategori engelska
                </label>
              </div>
            )}

            <input
              type="submit"
              className=" cursor-pointer mt-4 self-end"
              value="Lägg till"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryNamePopup;
