<script>
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";
	import localJson from "./data/data.json";

	/**
	 * Props for the Slider component
	 * @typedef {Object} SliderProps
	 * @property {string} showIndicators - Toggle indicators
	 * @property {string} dataSource (Local / Parent)
	 * @property {string} dataUrl - URL for fetch of data
	 * @property {string} variant - Variant of slider
	 * 31 januari, lämna butiken. efter det. inte fattat headless. bigcommerce. spam, rate limits + captcha – swish
	 */
	/** @type {SliderProps} */
	let {
		showIndicators,
		indicatorAlignment,
		data: parentData = null,
		dataSource = "local",
		dataUrl,
		variant,
		navigationVariant, //horisontell
		navigationAlignment, //start, center, end
		imageDescriptions,
		backgroundColor,
		autoPlay,
		autoPlayDuration,
		stopAutoPlayonInteraction,
	} = $props();

	const sliderAssets = import.meta.glob(
		"./**/*.{avif,gif,jpeg,jpg,png,svg,webp}",
		{ eager: true, import: "default" },
	);

	const resolveSliderPath = (value) => {
		if (typeof value !== "string") return value;
		if (!value.startsWith("./") && !value.startsWith("../")) return value;

		const normalized = value.startsWith("../")
			? `./${value.slice(3)}`
			: value;

		return sliderAssets[normalized] ?? value;
	};

	const resolveSliderData = (input) => {
		if (Array.isArray(input)) return input.map(resolveSliderData);

		if (input && typeof input === "object") {
			return Object.fromEntries(
				Object.entries(input).map(([key, val]) => [
					key,
					resolveSliderData(val),
				]),
			);
		}

		return resolveSliderPath(input);
	};

	//kolla data source, parent = parentData, json
	const rawData = $derived(dataSource === "parent" ? parentData : localJson);

	//rawdata
	const resolvedData = $derived(resolveSliderData(rawData));

	const slides = $derived(resolvedData?.[variant] ?? []);

	let autoPlayTimer = $state();

	let activeSlide = $state(0);
	let prevSlide = $state(0);

	/**
	 * - Kalkylerar håll beroende på om man går framåt eller bakåt i slidern.
	 */
	const direction = $derived(activeSlide > prevSlide ? 1 : -1);

	/**
	 * - Gå till ett specifikt index i slidern.
	 */
	const goToSlide = (i) => {
		prevSlide = activeSlide;
		activeSlide = i;
	};

	/**
	 * - Gå till nästa slide.
	 */
	const goToNextSlide = () => {
		prevSlide = activeSlide;

		if (slides.length === 0) return;

		activeSlide = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
	};

	/**
	 * - Gå till föregående slide.
	 */
	const goToPreviousSlide = () => {
		prevSlide = activeSlide;

		if (slides.length === 0) return;

		activeSlide = activeSlide !== 0 ? activeSlide - 1 : 0;
	};

	const startAutoplay = () => {
		autoPlayTimer = setInterval(goToNextSlide, autoPlayDuration);
	};

	const clearAutoplayInterval = () => {
		clearInterval(autoPlayTimer);
	};

	$effect(() => {
		if (!autoPlay) return;
		if (slides.length <= 1) return;

		startAutoplay();

		return () => clearAutoplayInterval();
	});
</script>

<div
	onmouseenter={clearAutoplayInterval}
	onmouseleave={startAutoplay}
	class="cw-slider-wrapper"
	role="region"
	aria-label="Image carousel"
>
	<div class="cw-slider-container">
		<!-- slides loop -->
		{#if variant === "slideshow"}
			<!-- image slideshow -->
			{#each slides as slide, i (slide.url)}
				{#if activeSlide === i}
					<div
						in:fly={{ x: 50 }}
						out:fly={{ y: 20 }}
						class="image-container"
					>
						{#if imageDescriptions}
							<div class="gradient-overlay"></div>
							<p class="image-description">{slide.description}</p>
						{/if}
						<img src={slide.url} alt={slide.description} />
					</div>
				{/if}
			{/each}
		{/if}

		{#if navigationVariant === "inset"}
			<div class="inset-navigation-buttons">
				<button
					onclick={goToPreviousSlide}
					aria-label="go to previous slide"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 256 256"
						><rect width="256" height="256" fill="none" /><polyline
							points="200 208 120 128 200 48"
							fill="none"
							stroke="var(--caret-color)"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="16"
						/><polyline
							points="120 208 40 128 120 48"
							fill="none"
							stroke="var(--caret-color)"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="16"
						/></svg
					>
				</button>
				<button onclick={goToNextSlide} aria-label="go to next slide">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 256 256"
						><rect width="256" height="256" fill="none" /><polyline
							points="56 48 136 128 56 208"
							fill="none"
							stroke="var(--caret-color)"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="16"
						/><polyline
							points="136 48 216 128 136 208"
							fill="none"
							stroke="var(--caret-color)"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="16"
						/></svg
					>
				</button>
			</div>
		{/if}

		{#if showIndicators}
			<div class="inset-indicator-container">
				{#each slides as slide, i (slide.url)}
					<button
						aria-label="slide indicator"
						onclick={() => goToSlide(i)}
						class="indicator"
						class:active={activeSlide === i}
					></button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- outside / side-to-side -->
	{#if navigationVariant === "outside"}
		<div class="indicator-button-container">
			{#if showIndicators}
				<div
					class="cw-slider-indicators {carouselTimer != null
						? 'animation-on'
						: ''}"
				>
					{#each team as member, i}
						<div
							class="indicator {i === activeSlide
								? 'active'
								: ''}"
						>
							<div class="progress"></div>
						</div>
					{/each}
				</div>
			{/if}
			<div class="button-container d-flex gap-1">
				<button
					onmouseenter={() => (
						clearInterval(carouselTimer),
						(carouselTimer = null)
					)}
					class="round left"
					onclick={goToPreviousSlide}
					aria-label="previous"
				>
					Previous
				</button>
				<button
					onmouseenter={() => (
						clearInterval(carouselTimer),
						(carouselTimer = null)
					)}
					class="round"
					onclick={goToNextSlide}
					aria-label="next"
				>
					Next
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.cw-slider-wrapper {
		.cw-slider-container {
			position: relative;
			overflow: hidden;
			height: 20rem;

			.image-container {
				position: absolute;
				height: inherit;
				overflow: hidden;
				inset: 0;

				.gradient-overlay {
					position: absolute;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.25);
					left: 0;
					height: 10%;
					border-top: 1px solid rgba(255, 255, 255, 0.15);
					width: 100%;
				}

				.image-description {
					position: absolute;
					bottom: 0;
					color: white;
					left: 0;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}

			.inset-navigation-buttons {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 2;
				display: flex;
				justify-content: space-between;
				opacity: 0;
				transition: opacity 0.1s ease;

				button {
					all: unset;
					cursor: pointer;
					height: 100%;
					width: 10%;
					display: grid;
					place-items: center;
					background: rgba(255, 255, 255, 0.25);

					svg {
						--caret-color: white;
						width: 2rem;
						transition: transform 0.1s ease;
					}

					&:hover {
						svg {
							transform: scale(1.15);
						}
					}
				}
			}

			.inset-indicator-container {
				position: absolute;
				z-index: 2;
				display: flex;
				bottom: 1rem;
				width: 100%;
				justify-content: center;
				gap: 0.5rem;

				.indicator {
					all: unset;
					height: 0.5rem;
					width: 0.5rem;
					background-color: rgba(255, 255, 255, 0.25);
					border-radius: 100%;
					cursor: pointer;

					&.active {
						background-color: white;
					}
				}
			}
		}

		&:hover {
			.inset-navigation-buttons {
				opacity: 1;
			}
		}
	}
</style>
