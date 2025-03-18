"use client";
import React, { useState } from "react";
import TimePicker from "../TimePicker";
import { DatePicker } from "../DatePicker";
import styles from "./style.module.scss";
import { toast } from "sonner";

const BookingForm = () => {
  const [isBookingTime, setBookingTime] = useState(0);
  const [date, setDate] = React.useState();
  const [isFormData, setFormData] = useState({
    name: "",
    guests: "",
    phone: "",
    message: "",
    date: "",
    time: "",
  });

  /*
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  */

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setFormData({ date: date });
    console.log("Form Data:", isFormData);
    toast("A Sonner toast", {
      className: " ",
      description: "With a description and an icon",
      duration: 5000,
    });
    //console.log("Date:", date);
    //console.log("date", date);

    let responce = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: isFormData.name,
        guests: isFormData.guests,
        phone: isFormData.phone,
        message: isFormData.message,
        date: date,
        time: isFormData.time,
      }),
    });

    const result = await responce.json();

    console.log("Responce", result);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex items-center justify-center   "
      >
        <div className="  w-full ">
          <div className="flex flex-col gap-4 ea-grid ">
            <div className=" flex-1 flex flex-col flex-grow gap-4 ea-col-6 ea-col-xs-12 ">
              <input
                type="text"
                name="name"
                placeholder="Namn"
                onChange={(e) =>
                  setFormData({ ...isFormData, name: e.target.value })
                }
                className=" bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] border border-input hover:border-[#5F6952] "
              />

              <div className="flex flex-col gap-4 justify-between md:flex-row">
                <div className="rounded-md w-full cursor-pointer border border-input flex justify-start   ">
                  <select
                    id="pet-select"
                    name="guest"
                    onChange={(e) =>
                      setFormData({ ...isFormData, guests: e.target.value })
                    }
                    className="p-2  h-12   text-[#9CA3B0] bg-white w-full"
                  >
                    <option value="">Antal gäster</option>
                    <option value="1">1 Gäst</option>
                    <option value="2">2 Gäster</option>
                    <option value="3">3 Gäster</option>
                    <option value="4">4 Gäster</option>
                    <option value="5">5 Gäster</option>
                    <option value="6">6 Gäster</option>
                  </select>
                </div>
                <div>
                  <DatePicker date={date} setDate={setDate} />
                </div>
                <div>
                  <TimePicker
                    isFormData={isFormData}
                    setFormData={setFormData}
                  />
                </div>
              </div>
            </div>
            <div className=" flex-1 flex-grow flex flex-col gap-4  ea-col-6 ea-col-xs-12 ">
              <input
                type="text"
                name="phone"
                placeholder="Telefonnummer"
                onChange={(e) =>
                  setFormData({ ...isFormData, phone: e.target.value })
                }
                className=" bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] border border-input hover:border-[#5F6952]"
              />

              <textarea
                type="textarea"
                name="message"
                placeholder="Meddelande"
                onChange={(e) =>
                  setFormData({ ...isFormData, message: e.target.value })
                }
                className=" bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] border border-input hover:border-[#5F6952]"
              />
            </div>
          </div>
          <div>
            <button className="w-full bg-[#5F6952] py-4  rounded-md mt-4 text-white font-Inter">
              Boka bord
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
