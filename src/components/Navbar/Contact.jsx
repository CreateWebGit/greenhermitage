import React from "react";
import { MdEmail, MdOutlineAccessTime } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";

const Contact = () => {
  return (
    <div className="flex">
      <div className="text-orange-400 mx-2 flex items-center">
        <MdEmail className="mr-2" color="#F49A11" />
        info@friisel.se
      </div>
      <div className="text-orange-400 mx-2 flex items-center">
        <MdOutlineAccessTime className="mr-2" color="#F49A11" />
        Måndag - Fredag 08.00 16.00
      </div>
      <div className="text-orange-400 mx-2 flex items-center">
        <BsTelephoneFill className="mr-2" color="#F49A11" />
        123-456-789
      </div>
    </div>
  );
};

export default Contact;
