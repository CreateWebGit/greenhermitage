import { checkIsNumber, padNumberToString } from "@/utils/timeConverter";
import { Clock4 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Popover, PopoverContent, PopoverTrigger } from "../DatePicker/popover";

const TimePickerInput = ({
	isOpen,
	setIsOpen,
	timeValues,
	setTimeValues,
	errors,
}) => {
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
				setTimeValues((oldValues) => ({
					...oldValues,
					hour: numberValue,
				}));
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
				setTimeValues((oldValues) => ({
					...oldValues,
					minutes: numberValue,
				}));
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
				setTimeValues((oldValues) => ({
					...oldValues,
					secounds: numberValue,
				}));
			} else {
				inputSecoundsRef.value = padNumberToString(timeValues.secounds);
			}
		}
	}

	const isNotEmpty = () => isOpen || timeValues.hour > 0;

	console.log(timeValues.hour);

	const inputClass =
		"text-[#9CA3B0] select-none text-xs text-center bg-transparent outline-none h-7 w-8 cursor-pointer hover:bg-white/10 rounded-md";

	return (
		<PopoverTrigger asChild>
			<div
				className={twMerge(
					`z-40  px-4 w-full cursor-pointer text-[#9CA3B0] text-xs font-semibold bg-colorForm  ${errors.time ? "border border-red-400" : "border"} border-colorForm hover:border-[#5F6952]  rounded-md h-[50px] flex items-center justify-start transition-all`,
					errors.time ? "border border-red-400" : ""
				)}
				onClick={() => {
					setIsOpen(true);
				}}
			>
				<div
					className={twMerge(
						"w-full flex justify-start gap-3 items-center",
						isNotEmpty() && "hidden"
					)}
				>
					<p className=" font-Inter  text-[#9CA3B0] ">Tid</p>
					<Clock4 className="mr-2 h-4 w-4" color="#9CA3B0" />
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
						inputMode="none"
					/>
					<p>:</p>
					<input
						ref={inputMinutesRef}
						className={inputClass}
						value={padNumberToString(timeValues.minutes)}
						onInput={hanleOnInputMinutes}
						inputMode="none"
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
		</PopoverTrigger>
	);
};

export default TimePickerInput;
