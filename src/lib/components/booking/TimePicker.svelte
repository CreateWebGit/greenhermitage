<script>
	import { onMount } from "svelte";
	import { formData } from "../../stores/bookingFormStore";

	import TimePickerDropdown from "./TimePickerDropdown.svelte";
	import TimePickerInputs from "./TimePickerInputs.svelte";

	let showTimePickerDropdown = $state(false);
	let openedTime = $state({ hour: "", minute: "" });
	let dropdownEl = $state();

	function togglePickerDropdown(e) {
		const nextOpen = !showTimePickerDropdown;
		showTimePickerDropdown = nextOpen;

		if (nextOpen) {
			openedTime = { ...$formData.time };
		}
	}

	$effect(() => {
		if (!showTimePickerDropdown) return;

		const { hour, minute } = $formData.time;
		if (
			hour &&
			minute &&
			(hour !== openedTime.hour || minute !== openedTime.minute)
		) {
			showTimePickerDropdown = false;
		}
	});

	function handleDocumentClick(e) {
		if (!showTimePickerDropdown) return;
		if (dropdownEl && dropdownEl.contains(e.target)) return;
		showTimePickerDropdown = false;
	}

	onMount(() => {
		document.addEventListener("click", handleDocumentClick, true);

		return () => {
			document.removeEventListener("click", handleDocumentClick, true);
		};
	});
</script>

<button
	onclick={(e) => togglePickerDropdown(e)}
	class="time-picker-trigger"
	aria-label="time-picker-trigger"
>
	<TimePickerInputs {showTimePickerDropdown} />

	{#if showTimePickerDropdown}
		<div
			class="dropdown-wrapper"
			bind:this={dropdownEl}
			onclick={(e) => e.stopPropagation()}
		>
			<TimePickerDropdown />
		</div>
	{/if}
</button>

<style lang="scss">
	button {
		all: unset;
		position: relative;
		height: 100%;
		width: 100%;
		display: grid;
		place-items: center;

		.dropdown-wrapper {
			position: absolute;
		}
	}
</style>
