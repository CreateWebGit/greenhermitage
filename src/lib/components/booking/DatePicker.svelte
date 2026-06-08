<script>
	import { onMount } from "svelte";
	import { formData, updateFormData } from "$lib/stores/bookingFormStore";
	import { language } from "$lib/stores/languageStore";

	let showDatePicker = $state(false);
	let dropdownEl = $state();

	let viewYear = $state(new Date().getFullYear());
	let viewMonth = $state(new Date().getMonth());

	const monthNamesSv = [
		"Januari",
		"Februari",
		"Mars",
		"April",
		"Maj",
		"Juni",
		"Juli",
		"Augusti",
		"September",
		"Oktober",
		"November",
		"December",
	];

	const monthNamesEn = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const weekdaysSv = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];
	const weekdaysEn = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	function pad(number) {
		return String(number).padStart(2, "0");
	}

	function formatDate(year, month, day) {
		return `${year}-${pad(month + 1)}-${pad(day)}`;
	}

	function syncViewToSelected() {
		if ($formData.date) {
			const [year, month] = $formData.date.split("-").map(Number);
			if (year && month) {
				viewYear = year;
				viewMonth = month - 1;
				return;
			}
		}
		const today = new Date();
		viewYear = today.getFullYear();
		viewMonth = today.getMonth();
	}

	function togglePicker() {
		showDatePicker = !showDatePicker;
		if (showDatePicker) {
			syncViewToSelected();
		}
	}

	function previousMonth() {
		if (viewMonth === 0) {
			viewMonth = 11;
			viewYear -= 1;
			return;
		}
		viewMonth -= 1;
	}

	function nextMonth() {
		if (viewMonth === 11) {
			viewMonth = 0;
			viewYear += 1;
			return;
		}
		viewMonth += 1;
	}

	function selectDay(day) {
		updateFormData({ date: formatDate(viewYear, viewMonth, day) });
		showDatePicker = false;
	}

	function isSelected(day) {
		return $formData.date === formatDate(viewYear, viewMonth, day);
	}

	function handleDocumentClick(e) {
		if (!showDatePicker) return;
		if (dropdownEl && dropdownEl.contains(e.target)) return;
		showDatePicker = false;
	}

	onMount(() => {
		document.addEventListener("click", handleDocumentClick, true);

		return () => {
			document.removeEventListener("click", handleDocumentClick, true);
		};
	});

	const daysInMonth = $derived(
		new Date(viewYear, viewMonth + 1, 0).getDate(),
	);
	const firstDay = $derived(new Date(viewYear, viewMonth, 1).getDay());
	const leadingEmptyDays = $derived((firstDay + 6) % 7);
	const monthNames = $derived(
		currentLanguage === "en" ? monthNamesEn : monthNamesSv,
	);
	const weekdays = $derived(
		currentLanguage === "en" ? weekdaysEn : weekdaysSv,
	);
</script>

<button
	type="button"
	class="date-picker-trigger"
	aria-expanded={showDatePicker}
	onclick={togglePicker}
	class:empty={!showDatePicker}
>
	<span class="date-label">{$formData.date || t("Datum", "Date")}</span>

	{#if showDatePicker}
		<div
			class="date-popup"
			bind:this={dropdownEl}
			onclick={(e) => e.stopPropagation()}
		>
			<div class="date-popup-header">
				<button
					type="button"
					onclick={previousMonth}
					aria-label={t("Föregående månad", "Previous month")}
				>
					&#8592;
				</button>
				<span>{monthNames[viewMonth]} {viewYear}</span>
				<button
					type="button"
					onclick={nextMonth}
					aria-label={t("Nästa månad", "Next month")}
				>
					&#8594;
				</button>
			</div>

			<div class="weekday-row">
				{#each weekdays as day}
					<span>{day}</span>
				{/each}
			</div>

			<div class="day-grid">
				{#each Array(leadingEmptyDays).fill(0) as _}
					<span class="empty"></span>
				{/each}
				{#each Array(daysInMonth).fill(0) as _, index}
					<button
						type="button"
						class:selected={isSelected(index + 1)}
						onclick={() => selectDay(index + 1)}
					>
						{index + 1}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</button>

<style lang="scss">
	button {
		all: unset;
		cursor: pointer;
	}

	.date-picker-trigger {
		position: relative;
		display: grid;
		align-items: center;
		width: 100%;
		min-height: 2.5rem;
		// padding-left: 1rem;
	}

	.date-label {
		pointer-events: none;
	}

	.date-popup {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		z-index: 10;
		width: 16.5rem;
		padding: 0.75rem;
		border-radius: 1rem;
		background: #fff;
		box-shadow: 0 14px 40px rgba(20, 16, 12, 0.12);
		display: grid;
		gap: 0.75rem;
		animation: anim 0.5s ease;
	}

	.date-popup-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.95rem;
		font-weight: 600;
		color: #3a2f25;
	}

	.date-popup-header button {
		padding: 0.25rem 0.5rem;
		border-radius: 999px;
		background: #f0e6da;
	}

	.weekday-row {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #7a6a5b;
		text-align: center;
	}

	.day-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
	}

	.day-grid button,
	.day-grid .empty {
		display: grid;
		place-items: center;
		height: 2rem;
		border-radius: 0.6rem;
		font-size: 0.85rem;
		color: #3a2f25;
	}

	.day-grid button:hover {
		background: #f5eee5;
	}

	.day-grid button.selected {
		background: #2f2a24;
		color: #fff;
	}
</style>
