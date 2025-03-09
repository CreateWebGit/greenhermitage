import React from "react";

const Footer = ({ setNewCategoryWindowOpen }) => {
  return (
    <div className="flex justify-end gap-4 mt-4 md:mr-12 ">
      <button
        className=" bg-blue-600 rounded-md py-2 px-4 text-white"
        type="button"
        onClick={() => setNewCategoryWindowOpen(true)}
      >
        Ny kategori
      </button>
    </div>
  );
};

export default Footer;
