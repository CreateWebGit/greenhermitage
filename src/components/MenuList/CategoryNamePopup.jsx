import { cn } from "@/utils/utils";
import React, { useState } from "react";

const CategoryNamePopup = ({
  isCategoryName,
  setCategoryName,
  isNewCategoryWindowOpen,
  setNewCategoryWindowOpen,
  handleNewSectionSubmit,
}) => {
  return (
    <div
      className="bg-slate-600/70 fixed top-0  bottom-0 left-0 right-0 flex  justify-center items-center z-[0]"
      type="button"
    >
      <div className=" relative bg-white p-8 z-50 ml-56  animate-wiggle">
        <div
          className="absolute top-1 right-1 z-50  "
          onClick={() => setNewCategoryWindowOpen(false)}
        >
          X
        </div>
        <div>
          <form onSubmit={handleNewSectionSubmit} className="flex flex-col">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={isCategoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                name="categoryName"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="categoryName"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Namn på kategori
              </label>
            </div>

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
