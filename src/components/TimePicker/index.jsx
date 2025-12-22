"use client";
import {
	secoundsToTimeValues,
	timeValuesToSecounds,
	stringifyTime,
} from "@/utils/timeConverter";
import React, { useState, useEffect } from "react";
import TimePickerInput from "./time-picker-input";
import TimePickerDropdown from "./time-picker-dropdown";
import { twMerge } from "tailwind-merge";
import { Popover, PopoverContent, PopoverTrigger } from "../DatePicker/popover";

const TimePicker = ({ isFormData, setFormData, errors }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [timeValues, setTimeValues] = useState(
		secoundsToTimeValues(isFormData.time)
	);
	console.log(timeValues);
	function handleOpenChange() {
		setFormData({
			...isFormData,
			time: stringifyTime(timeValues),
		});
	}
	return (
		<>
			<div className="">
				<Popover onOpenChange={handleOpenChange}>
					<PopoverContent className="w-auto p-0">
						<TimePickerDropdown
							setIsOpen={setIsOpen}
							isOpen={isOpen}
							timeValues={timeValues}
							setTimeValues={setTimeValues}
							onConfirm={() => {
								setFormData({
									...isFormData,
									time: stringifyTime(timeValues),
								});
								setIsOpen(false);
							}}
						/>
					</PopoverContent>

					<TimePickerInput
						errors={errors}
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

/* 
onConfirm -> sätter tidsdata, och sätter 

*/
