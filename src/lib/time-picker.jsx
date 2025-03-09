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
  return (
    <>
      <div className="relative z-50">
        <TimePickerInput
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          timeValues={timeValues}
          setTimeValues={setTimeValues}
        />

        <TimePickerDropdown
          isOpen={isOpen}
          timeValues={timeValues}
          setTimeValues={setTimeValues}
          onConfirm={() => {
            setTime(timeValuesToSecounds(timeValues));
            setIsOpen(false);
          }}
        />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={twMerge(
          "bg-red-300",
          !isOpen ? "hidden" : "fixed top-0 left-0 right-0 bottom-0"
        )}
      ></div>
    </>
  );
};

export default TimePicker;
