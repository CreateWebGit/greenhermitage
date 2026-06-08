<script lang="ts">
	//import TimePicker from "../TimePicker.svelte";
	//import DatePicker from "../DatePicker.svelte";
	//import { format } from "date-fns";

	type FormData = {
		name: string;
		email: string;
		guests: string;
		phone: string;
		message: string;
		date: string;
		time: string;
	};

	type Errors = Partial<Record<keyof FormData, boolean>>;

	let isBookingTime = 0; // kvar för parity med din React, men används inte här
	let date: Date | undefined = undefined;

	let errors: Errors = {};
	let hasBooked = false;

	let formData: FormData = {
		name: "",
		email: "",
		guests: "",
		phone: "",
		message: "",
		date: "",
		time: ""
	};

	// Rensa errors när formData ändras (motsvarar useEffect([isFormData]))
	$: formData, (errors = {});

	// Synca datum-sträng när date ändras (motsvarar useEffect([date]))

    /*
	$: formData = {
		...formData,
		date: date ? format(date, "yyyy-MM-dd") : ""
	};
    */

	$: hasErrors = Object.keys(errors).length > 0;

	function setDate(next: Date | undefined) {
		date = next;
	}

	function setFormData(updater: FormData | ((prev: FormData) => FormData)) {
		formData = typeof updater === "function" ? updater(formData) : updater;
	}


	async function handleSubmit(event: SubmitEvent) {

        /*
		event.preventDefault();

		const emptyFields = (Object.entries(formData) as [keyof FormData, string][])
			.filter(([, value]) => String(value).trim() === "")
			.map(([key]) => key);

		if (emptyFields.length) {
			const errorMap = emptyFields.reduce<Errors>((acc, key) => {
				acc[key] = true;
				return acc;
			}, {});

			errors = errorMap;
			return;
		}

		errors = {};


		const response = await fetch("/api/send", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: formData.name,
				email: formData.email,
				guests: formData.guests,
				phone: formData.phone,
				message: formData.message,
				date: date ? format(date, "yyyy-MM-dd") : "",
				time: formData.time
			})
		});

		const result = await response.json();

		if (result?.status === 200) {
			hasBooked = true;
		}

		console.log("Response", result);

        */
	}
</script>

<div class="container">
	<form on:submit={handleSubmit} class="w-full h-full flex items-center justify-center">
		<div class="w-full">
			<div class="flex flex-col gap-4 ea-grid">
				<div class="flex-1 flex flex-col flex-grow gap-4 ea-col-6 ea-col-xs-12">
					<input
						type="text"
						name="name"
						placeholder="Namn"
						on:input={() => (errors = {})}
						on:change={(e) =>
							setFormData({ ...formData, name: (e.currentTarget as HTMLInputElement).value })}
						class={`bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] ${
							errors.name ? "border border-red-400" : "border"
						} border-input hover:border-[#5F6952]`}
					/>

					<input
						type="text"
						name="email"
						placeholder="Email"
						on:change={(e) =>
							setFormData({ ...formData, email: (e.currentTarget as HTMLInputElement).value })}
						class={`bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] ${
							errors.email ? "border border-red-400" : "border"
						} border-input hover:border-[#5F6952]`}
					/>

					<div class="flex flex-col gap-4 justify-between md:flex-row">
						<div
							class={`rounded-md w-full cursor-pointer ${
								errors.guests ? "border border-red-400" : "border"
							} border-input flex justify-start`}
						>
							<select
								id="pet-select"
								name="guest"
								on:change={(e) =>
									setFormData({ ...formData, guests: (e.currentTarget as HTMLSelectElement).value })}
								class="p-2 h-12 text-[#9CA3B0] bg-white w-full"
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
                            <!--
							<DatePicker {errors} {date} {setDate} />
                            -->
						</div>

						<div>
                            <!--
							<TimePicker {errors} {formData} {setFormData} />
                            -->
						</div>
					</div>
				</div>

				<div class="flex-1 flex-grow flex flex-col gap-4 ea-col-6 ea-col-xs-12">
					<input
						type="text"
						name="phone"
						placeholder="Telefonnummer"
						on:change={(e) =>
							setFormData({ ...formData, phone: (e.currentTarget as HTMLInputElement).value })}
						class={`bg-colorForm w-full py-2 px-4 rounded-md font-Inter text-[#5F6952] ${
							errors.phone ? "border border-red-400" : "border"
						} border-input hover:border-[#5F6952]`}
					/>

					<textarea
						name="message"
						placeholder="Meddelande"
						on:change={(e) =>
							setFormData({ ...formData, message: (e.currentTarget as HTMLTextAreaElement).value })}
						class={`bg-colorForm w-full h-full resize-none py-2 px-4 rounded-md font-Inter text-[#5F6952] ${
							errors.message ? "border border-red-400" : "border"
						} border-input hover:border-[#5F6952]`}
					></textarea>
				</div>
			</div>

			<div>
				<button
					class={`w-full bg-[#5F6952] py-4 rounded-md mt-4 text-white font-Inter ${
						hasErrors ? "animation-shake bg-red-400" : ""
					}`}
					disabled={hasBooked}
				>
					{#if hasErrors}
						Alla fält måste vara ifyllda!
					{:else if hasBooked}
						Tack för din bokning!
					{:else}
						Boka bord
					{/if}
				</button>
			</div>
		</div>
	</form>
</div>

<style lang="scss">
	.container {
		bottom: -130px;
		position: absolute;
		padding: 0 30px;
		width: 1000px;
		height: 300px;
		background-color: white;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #333;
		z-index: 999;

		@media (max-width: 786px) {
			bottom: -480px;
			height: 550px;
			width: 90%;
		}
	}
</style>