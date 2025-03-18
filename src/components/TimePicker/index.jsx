"use client";
import {
  secoundsToTimeValues,
  timeValuesToSecounds,
} from "@/utils/timeConverter";
import React, { useState } from "react";
import TimePickerInput from "./time-picker-input";
import TimePickerDropdown from "./time-picker-dropdown";
import { twMerge } from "tailwind-merge";
import { Popover, PopoverContent, PopoverTrigger } from "../DatePicker/popover";

const TimePicker = ({ isFormData, setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValues, setTimeValues] = useState(
    secoundsToTimeValues(isFormData.time)
  );
  console.log(timeValues);
  return (
    <>
      <div className="">
        <Popover>
          <PopoverContent className="w-auto p-0">
            <TimePickerDropdown
              isOpen={isOpen}
              timeValues={timeValues}
              setTimeValues={setTimeValues}
              onConfirm={() => {
                setFormData({
                  ...isFormData,
                  time: timeValuesToSecounds(timeValues),
                });
                setIsOpen(false);
              }}
            />
          </PopoverContent>

          <TimePickerInput
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            timeValues={timeValues}
            setTimeValues={setTimeValues}
          />
        </Popover>
      </div>
    </>
  );
};

export default TimePicker;
