"use client";
import React, { useState, useEffect } from "react";
import TimePicker from "../TimePicker";
import { DatePicker } from "../DatePicker";
import styles from "./style.module.scss";
import { format } from "date-fns";
import { toast } from "sonner";

const BookingForm = () => {
	const [isBookingTime, setBookingTime] = useState(0);
	const [date, setDate] = React.useState();
	const [errors, setErrors] = useState({});
	const [hasBooked, setHasBooked] = useState(false);
	const [isFormData, setFormData] = useState({
		name: "",
		email: "",
		guests: "",
		phone: "",
		message: "",
		date: "",
		time: "",
	});
	useEffect(() => {
		setErrors({});
	}, [isFormData]);

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			date: date ? format(date, "yyyy-MM-dd") : "",
		}));
	}, [date]);

	const hasErrors = Object.keys(errors).length > 0;

	const handleSubmit = async (event) => {
		event.preventDefault();
		//check if isFormData has any empty fields, some = ifall vilken som helst av dom är tom.
		const hasEmptyField = Object.values(isFormData).some(
			(value) => String(value).trim() === ""
		);

		//hämta alla tomma fält
		const emptyFields = Object.entries(isFormData)
			.filter(([, value]) => String(value).trim() === "")
			.map(([key]) => key);

		//vi loopar igenom alla tomma fält, vi hämtar ut alla keys, och varje key får ett värde av true
		if (emptyFields.length) {
			const errorMap = emptyFields.reduce((acc, key) => {
				acc[key] = true;
				return acc;
			}, {});

			setErrors(errorMap);

			//vi stannar funktionen här
			return;
		}

		setErrors({});

		let responce = await fetch("/api/send", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: isFormData.name,
				email: isFormData.email,
				guests: isFormData.guests,
				phone: isFormData.phone,
				message: isFormData.message,
				date: format(date, "yyyy-MM-dd"),
				time: isFormData.time,
			}),
		});

		const result = await responce.json();

		if (result.status === 200) {
			setHasBooked(true);
		}

		console.log("Responce", result);
	};

	return (
		<div className={styles.container}>
			<form
				onSubmit={handleSubmit}
				className="w-full h-full flex items-center justify-center"
			>
				<div className="  w-full ">
					<div className="flex flex-col gap-4 ea-grid ">
						<div className=" flex-1 flex flex-col flex-grow gap-4 ea-col-6 ea-col-xs-12 ">
							<input
								type="text"
								name="name"
								placeholder="Namn"
								onInput={() => setErrors({})}
								onChange={(e) =>
									setFormData({
										...isFormData,
										name: e.target.value,
									})
								}
								className={`bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] ${errors.name ? "border border-red-400" : "border"} border-input hover:border-[#5F6952]`}
							/>

							<input
								type="text"
								name="email"
								placeholder="Email"
								onChange={(e) =>
									setFormData({
										...isFormData,
										email: e.target.value,
									})
								}
								className={`bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] ${errors.email ? "border border-red-400" : "border"} border-input hover:border-[#5F6952]`}
							/>

							<div className="flex flex-col gap-4 justify-between md:flex-row">
								<div
									className={`rounded-md w-full cursor-pointer ${errors.guests ? "border border-red-400" : "border"} border-input flex justify-start`}
								>
									<select
										id="pet-select"
										name="guest"
										onChange={(e) =>
											setFormData({
												...isFormData,
												guests: e.target.value,
											})
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
									<DatePicker
										errors={errors}
										date={date}
										setDate={setDate}
									/>
								</div>
								<div>
									<TimePicker
										errors={errors}
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
									setFormData({
										...isFormData,
										phone: e.target.value,
									})
								}
								className={`bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] ${errors.phone ? "border border-red-400" : "border"} border-input hover:border-[#5F6952]`}
							/>

							<textarea
								type="textarea"
								name="message"
								placeholder="Meddelande"
								onChange={(e) =>
									setFormData({
										...isFormData,
										message: e.target.value,
									})
								}
								className={`bg-colorForm w-full h-full resize-none py-2 px-4 rounded-md font-Inter text-[#5F6952] ${errors.message ? "border border-red-400" : "border"} border-input hover:border-[#5F6952]`}
							/>
						</div>
					</div>
					<div>
						<button
							className={`w-full bg-[#5F6952] py-4 rounded-md mt-4 text-white font-Inter ${hasErrors ? "animation-shake bg-red-400" : ""}`}
							disabled={hasBooked}
						>
							{hasErrors
								? "Alla fält måste vara ifyllda!"
								: hasBooked
									? "Tack för din bokning!"
									: "Boka bord"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default BookingForm;
