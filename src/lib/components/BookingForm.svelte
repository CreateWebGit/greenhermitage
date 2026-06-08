<script>
	//stores
	import { formData, updateFormData } from "$lib/stores/bookingFormStore";
	import { language } from "$lib/stores/languageStore";

	//components
	import TimePicker from "./booking/TimePicker.svelte";
	import DatePicker from "./booking/DatePicker.svelte";
	import GuestSelect from "./booking/GuestSelect.svelte";

	//icons
	import UsersThree from "phosphor-svelte/lib/UsersThree";
	import CalendarDots from "phosphor-svelte/lib/CalendarDots";
	import Clock from "phosphor-svelte/lib/Clock";

	let errors = $state({});
	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	$effect(() => {
		$formData;
		errors = {};
	});

	function validate(data) {
		const next = {};
		const name = (data.name || "").trim();
		const email = (data.email || "").trim();
		const phone = (data.phone || "").trim();
		const guests = data.guests;
		const date = data.date;
		const time = data.time || {};

		if (!name) next.name = t("Namn är obligatoriskt.", "Name is required.");
		if (!email) next.email = t("Email är obligatoriskt.", "Email is required.");
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			next.email = t("Ange en giltig email.", "Enter a valid email.");

		if (!guests) next.guests = t("Välj antal gäster.", "Select number of guests.");
		if (!date) next.date = t("Välj datum.", "Select a date.");
		if (!time.hour || !time.minute) next.time = t("Välj tid.", "Select a time.");

		if (!phone) next.phone = t("Telefonnummer är obligatoriskt.", "Phone number is required.");
		else if (!/^[0-9+\-()\s]{6,}$/.test(phone))
			next.phone = t("Ange ett giltigt telefonnummer.", "Enter a valid phone number.");

		return next;
	}

	async function handleSubmit() {
		const nextErrors = validate($formData);
		errors = nextErrors;
		if (Object.keys(nextErrors).length > 0) return;

		// console.log("hehe");
		let response = await fetch("/api/send", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: $formData.name,
				email: $formData.email,
				guests: $formData.guests,
				phone: $formData.phone,
				message: $formData.message,
				date: $formData.date,
				time: $formData.time,
				language: currentLanguage,
			}),
		});

		const result = await response.json();

		if (result.status === 200) {
			console.log("has booked");
		}

		console.log("Response", result);
	}
</script>

<div class="table-booking-form">
	<div class="d-flex flex-column">
		<div class="d-flex flex-column">
			<input
			onfocus={() => (errors = {})}
			oninput={(e) => updateFormData({ name: e.currentTarget.value })}
			type="text"
			placeholder={t("Namn", "Name")}
			class:error={errors.name}
		/>
			<input
				onfocus={() => (errors = {})}
			oninput={(e) =>
				updateFormData({ email: e.currentTarget.value })}
			type="text"
			placeholder={t("Email", "Email")}
			class:error={errors.email}
		/>
		</div>
		<div class="d-flex flex-column-xs">
			<div
				class="custom-component-input-container"
				class:error={errors.guests}
			>
				<GuestSelect />
				<UsersThree size={"1.25rem"} />
			</div>
			<div
				class="custom-component-input-container"
				class:error={errors.date}
			>
				<DatePicker />
				<CalendarDots size={"1.25rem"} />
			</div>
			<div
				class="custom-component-input-container"
				class:error={errors.time}
			>
				<TimePicker />
				<Clock size={"1.25rem"} />
			</div>
		</div>
	</div>
	<div class="d-flex flex-column">
		<input
			onfocus={() => (errors = {})}
			oninput={(e) => updateFormData({ phone: e.currentTarget.value })}
			type="text"
			placeholder={t("Telefonnummer", "Phone number")}
			class:error={errors.phone}
		/>
		<textarea
			onfocus={() => (errors = {})}
			oninput={(e) => updateFormData({ message: e.currentTarget.value })}
			placeholder={t("Meddelande", "Message")}
		></textarea>
	</div>
	<button
		class:error={Object.keys(errors).length > 0}
		onclick={handleSubmit}
		class="primary submit-button"
	>
		{#if Object.keys(errors).length > 0}
			<span class="submit-title">
				{t("Dessa fält måste vara ifyllda", "These fields must be filled in")}
			</span>
		{:else}
			<span class="submit-title">{t("Boka bord", "Book a table")}</span>
		{/if}
	</button>
</div>

<style lang="scss">
	.table-booking-form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		padding: 1rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}

		.d-flex {
			gap: 1rem;
		}
	}

	.submit-button {
		grid-column: span 2;

		&.error {
			background-color: rgb(228, 82, 82);
			animation: shake .7s ease-in-out;
		}

		@media (max-width: 768px) {
			grid-column: span 1;
		}
	}

	input.error,
	textarea.error,
	.custom-component-input-container.error {
		border: 1px solid rgb(228, 118, 118);
		box-shadow: 0 0 0 1px rgba(216, 141, 141, 0.11);
	}

	.submit-title {
		display: block;
	}

	.submit-note {
		display: block;
		font-size: 0.8rem;
		opacity: 0.85;
	}
</style>
