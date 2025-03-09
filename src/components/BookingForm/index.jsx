"use client";
import React, { useState } from "react";
import TimePicker from "../TimePicker";
import { DatePickerDemo } from "../DatePicker";
import styles from "./style.module.scss";

const BookingForm = () => {
  const [isBookingTime, setBookingTime] = useState(0);
  return (
    <div className={styles.container}>
      <div className="w-full h-full p-4">
        <div className="flex gap-4 ea-grid">
          <div className=" flex-1 flex flex-col flex-grow gap-4 ea-col-6 ea-col-xs-12">
            <div className="">
              <input
                type="text"
                placeholder="Förnamnmmm"
                className=" bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] border border-input hover:border-[#5F6952] "
              />
            </div>
            <div className="flex justify-between">
              <div className="">
                <select
                  id="pet-select"
                  className="p-2  bg-colorForm text-[#9CA3B0] rounded-md cursor-pointer border border-input hover:border-[#5F6952]"
                >
                  <option value="">Antal gästermmm</option>
                  <option value="1">1 Gäst</option>
                  <option value="2">2 Gäster</option>
                  <option value="3">3 Gäster</option>
                  <option value="4">4 Gäster</option>
                  <option value="5">5 Gäster</option>
                  <option value="6">6 Gäster</option>
                </select>
              </div>
              <div>
                <DatePickerDemo />
              </div>
              <div>
                <TimePicker time={isBookingTime} setTime={setBookingTime} />
              </div>
            </div>
          </div>
          <div className=" flex-1 flex-grow flex flex-col gap-4  ea-col-6 ea-col-xs-12">
            <div>
              <input
                type="text"
                placeholder="Telefonnummer"
                className=" bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] border border-input hover:border-[#5F6952]"
              />
            </div>
            <div>
              <textarea
                type="textarea"
                placeholder="Meddelande"
                className=" bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] border border-input hover:border-[#5F6952]"
              />
            </div>
          </div>
        </div>
        <div>
          <button className="w-full bg-[#5F6952] py-4 rounded-md mt-4 text-white font-Inter">
            Boka bord
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
