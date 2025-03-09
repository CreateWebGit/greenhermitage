import { checkIsNumber, padNumberToString } from "@/utils/timeConverter";
import { Clock4 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const TimePickerInput = ({ isOpen, setIsOpen, timeValues, setTimeValues }) => {
  let inputHoursRef = useRef(null);
  let inputMinutesRef = useRef(null);
  let inputSecoundsRef = useRef(null);
  console.log(timeValues.hour);
  useEffect(() => {
    if (inputHoursRef && isOpen) {
      inputHoursRef.current.focus();
    }

    if (inputHoursRef && !isOpen) {
      inputHoursRef.current.blur();
    }

    if (inputHoursRef && !isOpen) {
      inputMinutesRef.current.blur();
    }

    /*
    if (inputHoursRef && !isOpen) {
      inputSecoundsRef.current.blur();
    }
    */
  });

  function hanleOnInputHours(e) {
    console.log("value");

    const value = e.target.value;
    console.log(value);
    if (checkIsNumber(value)) {
      const numberValue = parseInt(value);
      if (numberValue >= 0 && numberValue <= 23) {
        setTimeValues((oldValues) => ({ ...oldValues, hour: numberValue }));
      } else {
        inputHoursRef.value = padNumberToString(timeValues.hour);
      }
    }
    console.log(inputHoursRef.value);
  }

  function hanleOnInputMinutes(e) {
    const value = e.target.value;
    if (checkIsNumber(value)) {
      const numberValue = parseInt(value);
      if (numberValue >= 0 && numberValue <= 59) {
        setTimeValues((oldValues) => ({ ...oldValues, minutes: numberValue }));
      } else {
        inputMinutesRef.value = padNumberToString(timeValues.minutes);
      }
    }
  }

  function hanleOnInputSecounds(e) {
    const value = e.target.value;
    if (checkIsNumber(value)) {
      const numberValue = parseInt(value);
      if (numberValue >= 0 && numberValue <= 23) {
        setTimeValues((oldValues) => ({ ...oldValues, secounds: numberValue }));
      } else {
        inputSecoundsRef.value = padNumberToString(timeValues.secounds);
      }
    }
  }

  const isNotEmpty = () => isOpen || timeValues.hour > 0;

  console.log(timeValues.hour);

  const inputClass =
    "text-[#9CA3B0] text-xs text-center bg-transparent outline-none h-7 w-8 cursor-pointer hover:bg-white/10 rounded-md";

  return (
    <div
      className={twMerge(
        "z-40 py-2 px-4 w-[120px] cursor-pointer text-[#9CA3B0] text-xs font-semibold bg-colorForm  border border-colorForm hover:border-[#5F6952] rounded-md h-9 flex items-center transition-all",
        isOpen && "ring-1 ring-white/40 border border-white/40"
      )}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <div
        className={twMerge(
          "w-full flex justify-between items-center",
          isNotEmpty() && "hidden"
        )}
      >
        <p className="text-xl font-Inter font-light text-[#9CA3B0] ">Tid</p>
        <Clock4 strokeWidth={0.5} color="#5F6952" />
      </div>

      <div
        className={twMerge(
          "flex items-center  text-[#9CA3B0]",
          !isNotEmpty() && "hidden"
        )}
      >
        <input
          ref={inputHoursRef}
          className={inputClass}
          value={padNumberToString(timeValues.hour)}
          onInput={hanleOnInputHours}
        />
        <p>:</p>
        <input
          ref={inputMinutesRef}
          className={inputClass}
          value={padNumberToString(timeValues.minutes)}
          onInput={hanleOnInputMinutes}
        />
        <Clock4 strokeWidth={0.5} />
        {/*
        <p>:</p>
        <input
          ref={inputSecoundsRef}
          className={inputClass}
          value={padNumberToString(timeValues.secounds)}
          onInput={hanleOnInputSecounds}
      />
      */}
      </div>
    </div>
  );
};

export default TimePickerInput;
