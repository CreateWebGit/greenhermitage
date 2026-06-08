<script>
	import { onMount } from "svelte";
	import { formData, updateFormData } from "$lib/stores/bookingFormStore";
	import { language } from "$lib/stores/languageStore";

	const guestOptions = ["1", "2", "3", "4", "5", "6"];
	let showGuestSelect = $state(false);
	let guestDropdownEl = $state();
	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	const guestLabel = (value) =>
		currentLanguage === "en"
			? `${value} Guest${value === "1" ? "" : "s"}`
			: `${value} Gäst${value === "1" ? "" : "er"}`;

	function toggleGuestSelect() {
		showGuestSelect = !showGuestSelect;
	}

	function selectGuests(value) {
		updateFormData({ guests: value });
		showGuestSelect = false;
	}

	function handleDocumentClick(e) {
		if (!showGuestSelect) return;
		if (guestDropdownEl && guestDropdownEl.contains(e.target)) return;
		showGuestSelect = false;
	}

	onMount(() => {
		document.addEventListener("click", handleDocumentClick, true);

		return () => {
			document.removeEventListener("click", handleDocumentClick, true);
		};
	});
</script>

<div class="guest-select" bind:this={guestDropdownEl}>
	<button
		type="button"
		class="guest-trigger"
		aria-expanded={showGuestSelect}
		onclick={toggleGuestSelect}
	>
		{$formData.guests
			? guestLabel($formData.guests)
			: t("Antal gäster", "Guests")}
	</button>
	{#if showGuestSelect}
		<div class="guest-dropdown">
			{#each guestOptions as option}
				<button type="button" onclick={() => selectGuests(option)}>
					{guestLabel(option)}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.guest-select {
		position: relative;
		width: 100%;
	}

	.guest-trigger {
		all: unset;
		cursor: pointer;
		display: grid;
		width: 100%;
	}

	.guest-dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		z-index: 10;
		width: 100%;
		padding: 0.5rem;
		border-radius: 1rem;
		background: #fff;
		box-shadow: 0 14px 40px rgba(20, 16, 12, 0.12);
		display: grid;
		gap: 0.25rem;
		font-family: "Inter", system-ui;
	}

	.guest-dropdown button {
		all: unset;
		cursor: pointer;
		padding: 0.5rem 0.75rem;
		border-radius: 0.6rem;
		font-size: 0.9rem;
		color: #3a2f25;
	}

	.guest-dropdown button:hover {
		background: #f5eee5;
	}
</style>
