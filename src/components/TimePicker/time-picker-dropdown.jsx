import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { range } from "@/utils/timeConverter";
import style from "./time-picker-dropdown.module.css";
import TimePickerDropdownItem from "./time-picker-dropdown-item";

const TimePickerDropdown = ({
	isOpen,
	timeValues,
	setTimeValues,
	onConfirm,
	setIsOpen,
}) => {
	let wrapperHoursRef = useRef(null);
	let wrapperMinutesRef = useRef(null);
	let wrapperSecoundsRef = useRef(null);

	const [currentScrollValueHours, setCurrentScrollValueHours] = useState();
	const [currentScrollValueMinutes, setCurrentScrollValueMinutes] =
		useState();
	const [currentScrollValueSecounds, setCurrentScrollValueSecounds] =
		useState();

	useEffect(() => {
		if (isOpen) {
			if (wrapperHoursRef)
				wrapperHoursRef.current.scrollTop = currentScrollValueHours;
			if (wrapperMinutesRef)
				wrapperMinutesRef.current.scrollTop = currentScrollValueMinutes;

			/*
      if (wrapperSecoundsRef)
        wrapperSecoundsRef.current.scrollTop = currentScrollValueSecounds;
        */
		}
	});
	return (
		<div
			className={twMerge(
				"text-[#5F6952] border  flex flex-col shadow-md bg-slate-100 rounded-lg  mx-auto h-fit w-[250]  items-center transition-all z-50  ",
				isOpen
					? "max-h-96 border border-white/10 translate-y-0 opacity-100 duration-300 "
					: "max-h-0 border-transparent border-none translate-y-6 opacity-0 scale-75 overflow-hidden"
			)}
		>
			<div className="grid grid-cols-2 text-xs font-bold text-center border-b border-white/10 py-3 w-full">
				<p>Timmar</p>
				<p>Minuter</p>
				{/* <p>secounds</p> */}
			</div>
			<div className="grid grid-cols-2 text-xs font-bold text-center w-full overflow-hidden">
				<div
					ref={wrapperHoursRef}
					className={twMerge(
						"flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth",
						`${style.dropdown}`
					)}
				>
					{range(0, 23).map((value, index) => (
						<div key={index}>
							<TimePickerDropdownItem
								index={index}
								value={value}
								isSelected={timeValues.hour === value}
								onClick={() => {
									setTimeValues((oldValues) => {
										return { ...oldValues, hour: value };
									});

									if (timeValues.minutes) {
										setIsOpen(false);
										console.log("hour was selected");
									}
								}}
								onSelected={(scrollValue) => {
									if (isOpen) {
										setCurrentScrollValueHours(scrollValue);
									}
								}}
							/>
						</div>
					))}
				</div>
				<div
					ref={wrapperMinutesRef}
					className={twMerge(
						"flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth",
						`${style.dropdown}`
					)}
				>
					{range(0, 59).map((value, index) => (
						<div key={index}>
							<TimePickerDropdownItem
								index={index}
								value={value}
								isSelected={timeValues.minutes === value}
								onClick={() => {
									setTimeValues((oldValues) => {
										return { ...oldValues, minutes: value };
									});

									if (timeValues.hour) {
										setIsOpen(false);
										console.log("hour was selected");
									}
								}}
								onSelected={(scrollValue) => {
									if (isOpen) {
										setCurrentScrollValueMinutes(
											scrollValue
										);
									}
								}}
							/>
						</div>
					))}
				</div>

				{/*
        <div
          ref={wrapperSecoundsRef}
          className={twMerge(
            "flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth",
            `${style.dropdown}`
          )}
        >
          {range(0, 59).map((value) => (
            <TimePickerDropdownItem
              value={value}
              isSelected={timeValues.secounds === value}
              onClick={() => {
                setTimeValues((oldValues) => {
                  return { ...oldValues, secounds: value };
                });
              }}
              onSelected={(scrollValue) => {
                if (isOpen) {
                  setCurrentScrollValueSecounds(scrollValue);
                }
              }}
            />
          ))}
        </div>
        */}

				<div className="w-64 px-2 py-3 border-t border-white/50">
					<button
						className="text-xs text-white font-bold bg-orange-800 w-full h-8 rounded-md hover:bg-orange-700 transition-colors"
						onClick={onConfirm}
					>
						Välj
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimePickerDropdown;
