<script>
	import { onMount } from "svelte";
	import { formData, updateFormData } from "$lib/stores/bookingFormStore";
	import { language } from "$lib/stores/languageStore";

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	//scroll single value into view
	function scrollTimeValueIntoView(e) {
		e.target.scrollIntoView();
	}

	onMount(() => {
		//scroll both values into view
		const selectedValues = document.querySelectorAll(".selected");

		console.log(selectedValues);

		selectedValues.forEach((selectedValue) => {
			selectedValue.scrollIntoView();
		});
	});
</script>

<div class="dropdown">
	<!-- hej hej -->
	<div class="column">
		<div class="title">{t("Timmar", "Hours")}</div>
		<div class="options">
			{#each Array(24).keys() as i}
				{@const hour = String(i).padStart(2, "0")}

				<button
					class:selected={$formData.time.hour === hour}
					onclick={(e) => {
						updateFormData((current) => ({
							...current,
							time: { ...current.time, hour },
						}));
						scrollTimeValueIntoView(e);
					}}
				>
					<span>{hour}</span>
				</button>
			{/each}
		</div>
	</div>
	<div class="column">
		<div class="title">{t("Minuter", "Minutes")}</div>
		<div class="options">
			{#each Array(60).keys() as i}
				{@const minute = String(i).padStart(2, "0")}

				<button
					class:selected={$formData.time.minute === minute}
					onclick={(e) => {
						updateFormData((current) => ({
							...current,
							time: { ...current.time, minute },
						}));
						scrollTimeValueIntoView(e);
					}}
				>
					<span>{minute}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.dropdown {
		--dropdown-width: 14.125rem;
		width: var(--dropdown-width);
		background: #f1f5f9;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		font-family: "Inter";
		border: #e3e3e3 1px solid;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -2px rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		position: absolute;
		top: 1.5rem;
		left: calc(-14.125rem / 2);
		animation: anim 0.5s ease;

		.column {
			.title {
				text-align: center;
				font-weight: 700;
				font-size: 0.75rem;
				padding: 0.75rem;
				color: #5f6952;
			}

			.options {
				max-height: 18rem;
				overflow-y: scroll;
				display: flex;
				flex-direction: column;
				scroll-behavior: smooth;

				&::-webkit-scrollbar {
					width: 4px;
					// background: white;
				}

				&::-webkit-scrollbar-thumb {
					background: white;
				}

				button {
					all: unset;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0.45rem 0;
					font-weight: 600;
					font-size: 0.75rem;
					color: #5f6952;
					cursor: pointer;

					span {
						padding: 0.25rem 0.5rem;
						border-radius: 0.375rem;
					}

					&.selected {
						color: red;

						span {
							color: white;
							background-color: #9a3412;
						}
					}
				}
			}
		}
	}
</style>
