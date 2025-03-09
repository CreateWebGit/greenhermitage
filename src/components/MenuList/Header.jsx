import React from "react";
import { BsArrowsCollapse } from "react-icons/bs";
import { CgReorder } from "react-icons/cg";

const Header = ({ handleSort, handleExpand }) => {
  return (
    <div className="flex justify-end gap-5 mb-4 md:mr-12">
      <button
        className=" flex items-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white shadow-lg"
        type="button"
        onClick={() => handleSort()}
      >
        Sortera <CgReorder />
      </button>
      <button
        className=" flex items-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white shadow-lg"
        type="button"
        onClick={() => handleExpand(false)}
      >
        Kollapsa <BsArrowsCollapse />
      </button>
    </div>
  );
};

export default Header;
