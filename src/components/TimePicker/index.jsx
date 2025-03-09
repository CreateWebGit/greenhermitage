"use client";
import {
  secoundsToTimeValues,
  timeValuesToSecounds,
} from "@/utils/timeConverter";
import React, { useState } from "react";
import TimePickerInput from "./time-picker-input";
import TimePickerDropdown from "./time-picker-dropdown";
import { twMerge } from "tailwind-merge";

const TimePicker = ({ time, setTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValues, setTimeValues] = useState(secoundsToTimeValues(time));
  console.log(timeValues);
  return (
    <>
      <div className="relative inline-block">
        <TimePickerDropdown
          isOpen={isOpen}
          timeValues={timeValues}
          setTimeValues={setTimeValues}
          onConfirm={() => {
            setTime(timeValuesToSecounds(timeValues));
            setIsOpen(false);
          }}
        />
        <TimePickerInput
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          timeValues={timeValues}
          setTimeValues={setTimeValues}
        />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={twMerge(
          "",
          !isOpen
            ? "hidden"
            : "fixed bottom-0 left-0 right-0 h-[1000px] z-40  overflow-y-auto"
        )}
      ></div>
    </>
  );
};

export default TimePicker;
