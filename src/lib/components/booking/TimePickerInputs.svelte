<script>
	import { formData, updateFormData } from "../../stores/bookingFormStore";
	import { language } from "$lib/stores/languageStore";

	let { showTimePickerDropdown } = $props();
	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	function sanitizeTimeInput(value, max) {
		const raw = value.replace(/\D/g, "").slice(0, 2);
		if (raw === "") return "0";
		const num = Math.min(parseInt(raw, 10), max);
		return String(num);
	}

	function padTimeValue(value) {
		return String(value).padStart(2, "0");
	}
</script>

<div
	class="time-picker-input-container"
	class:empty={!$formData.time.hour &&
		!$formData.time.minute &&
		!showTimePickerDropdown}
>
	{#if !$formData.time.hour && !$formData.time.minute && !showTimePickerDropdown}
		<p>{t("Tid", "Time")}</p>
	{:else}
		<input
			type="text"
			inputmode="numeric"
			maxlength="2"
			value={$formData.time.hour || "--"}
			oninput={(e) => {
				const value = sanitizeTimeInput(e.currentTarget.value, 23);
				updateFormData((current) => ({
					...current,
					time: { ...current.time, hour: value },
				}));
			}}
			onblur={() => {
				updateFormData((current) => ({
					...current,
					time: {
						...current.time,
						hour: padTimeValue(current.time.hour),
					},
				}));
			}}
		/>

		<p>:</p>

		<input
			type="text"
			inputmode="numeric"
			maxlength="2"
			value={$formData.time.minute || "--"}
			oninput={(e) => {
				const value = sanitizeTimeInput(e.currentTarget.value, 59);
				updateFormData((current) => ({
					...current,
					time: { ...current.time, minute: value },
				}));
			}}
			onblur={() => {
				updateFormData((current) => ({
					...current,
					time: {
						...current.time,
						minute: padTimeValue(current.time.minute),
					},
				}));
			}}
		/>
	{/if}
</div>

<style lang="scss">
	.time-picker-input-container {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		width: 100%;

		p {
			font-size: 1rem;
		}

		input[type="text"] {
			appearance: none;
			all: unset;
			font-family: "Inter";
			width: 2ch;
			font-size: 1rem;
		}
	}
</style>
