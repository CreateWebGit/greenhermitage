<script>
	import ReviewSliderCard from "../ReviewSliderCard.svelte";
	import Divider from "$lib/components/Divider.svelte";
	import { language } from "$lib/stores/languageStore";
	import IntersectionObserver from "svelte-intersection-observer";

	let elementOnce = $state();
	let intersectOnce = $state();

	let { reviews, images } = $props();
	let reviewsFiltered = reviews.filter((review) => review.highlight);

	let reviewSliderActiveReview = $state(0);
	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	let nextReview = () => {
		if (reviewSliderActiveReview === reviewsFiltered.length - 1) {
			reviewSliderActiveReview = 0;
		} else {
			reviewSliderActiveReview++;
		}
	};

	let prevReview = () => {
		if (reviewSliderActiveReview !== 0) {
			reviewSliderActiveReview--;
		}
	};

	let reviewContainerEl;

	$effect(() => {
		const index = reviewSliderActiveReview;

		if (!reviewContainerEl) return;

		const container = reviewContainerEl;

		// Grab all tab buttons
		const reviews = Array.from(
			container.querySelectorAll(".review-slider-card"),
		);

		const el = reviews[index];
		if (!el) return;

		const left =
			el.offsetLeft -
			container.offsetLeft -
			(container.clientWidth - el.clientWidth) / 2;

		container.scrollTo({
			left,
			behavior: "smooth",
		});
	});
</script>

<IntersectionObserver
	once
	element={elementOnce}
	bind:intersecting={intersectOnce}
>
	<section class="cw-section--reviews cw-grid full-width py-8 py-xs-4 gap-4">
		<div class="cw-col-12 cw-col-xs-12">
			<p class="h6 text-orange text-center">
				{t("RECENSIONER", "REVIEWS")}
			</p>
			<h1 class="text-center text-left-xs">
				{t("Vad våra gäster säger", "What our guests say")}
			</h1>
			<Divider marginTop="3" marginBottom="3" />
		</div>
		<div class="cw-col-7 cw-col-xs-12">
			<div class="review-slider">
				<div class="review-wrapper" bind:this={reviewContainerEl}>
					{#each reviewsFiltered as review, i}
						<ReviewSliderCard {review} {prevReview} {nextReview} />
					{/each}
				</div>
				<div class="bottom-container">
					<div class="indicator-container"></div>
					<div class="button-container">
						<button
							onclick={prevReview}
							aria-label="previous review slider button"
						>
							<span aria-hidden="true">‹</span>
						</button>
						<button
							onclick={nextReview}
							aria-label="next review slider button"
						>
							<span aria-hidden="true">›</span>
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- <div
			class="cw-col-1 cw-col-xs-12 hide-mobile"
			style="height: 528px"
		></div> -->
		<div
			class="cw-col-5 cw-col-xs-12 image-grid"
			bind:this={elementOnce}
			class:animation={intersectOnce}
		>
			<div class="first-row">
				<div class="image-1">
					<img src={images[0]} alt="" width="239" height="207" loading="lazy" decoding="async" />
				</div>
				<div class="image-2">
					<img src={images[1]} alt="" width="242" height="310" loading="lazy" decoding="async" />
				</div>
			</div>
			<div class="second-row">
				<div class="image-3">
					<img src={images[2]} alt="" width="242" height="310" loading="lazy" decoding="async" />
				</div>
				<div class="image-4">
					<img src={images[3]} alt="" width="239" height="207" loading="lazy" decoding="async" />
				</div>
			</div>
		</div>
		<div class="cw-col-12 cw-col-xs-12">
			<Divider marginTop="3" marginBottom="3" />
			<div
				class="button-container links d-flex gap-1"
				style="justify-content: center;"
			>
				<a href="/boka-bord" class="button primary">
					{t("Boka bord", "Book a table")}
				</a>
				<a href="/recensioner" class="button secondary green"
					>{t("Se fler recensioner", "See more reviews")}</a
				>
			</div>
		</div>
	</section>
</IntersectionObserver>

<style lang="scss">
	.cw-col-7 {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.review-slider {
		display: flex;
		flex-direction: column;
		position: relative;
		gap: 1rem;

		@media (max-width: 768px) {
			&::before,
			&::after {
				display: none;
			}
		}

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			content: "";
			background: linear-gradient(
				90deg,
				var(--color-bg-secondary) 75%,
				rgba(255, 255, 255, 0)
			);
			pointer-events: none;
			width: 3rem;
		}

		&::after {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			content: "";
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0),
				var(--color-bg-secondary) 75%
			);
			pointer-events: none;
			width: 3rem;
		}

		.review-wrapper {
			display: flex;
			overflow-x: scroll;
			gap: 1rem;
			scroll-snap-type: x mandatory;
			padding-right: 5rem;
			padding-left: 5rem;

			@media (max-width: 768px) {
				padding-right: 0;
				padding-left: 0;
				margin-left: -2rem;
				margin-right: -2rem;
			}

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.bottom-container {
			display: flex;
			justify-content: space-between;
			position: relative;
			z-index: 2;

			.indicator-container {
			}

			.button-container {
				display: flex;
				gap: 0.5rem;

				button {
					all: unset;
					background-color: #dddacf;
					border-radius: 100%;
					height: 2.625rem;
					width: 2.625rem;
					display: grid;
					place-items: center;
					color: var(--color-green);
					cursor: pointer;
					transition: background-color 0.2s ease;

					&:hover {
						background-color: hsl(from #dddacf h s calc(l - 5));
					}
				}
			}
		}
	}

	.image-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: hidden;
		border-radius: 1rem;

		@media (max-width: 768px) {
			margin-top: 2rem;
		}

		.first-row,
		.second-row {
			display: flex;
			justify-content: space-between;
			gap: 1rem;

			> div {
				border-radius: 0.5rem;
				overflow: hidden;

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}

			.image-1 {
				height: 12.9375rem;
				width: 14.9375rem;
				opacity: 0;
				transform: translateX(-50px) translateY(-50px) scale(0.5);
				transform-origin: top left;
				transition:
					opacity 1s ease,
					transform 1s ease;
			}

			.image-2 {
				height: 19.375rem;
				width: 15.125rem;
				opacity: 0;
				transform: translateX(50px) translateY(-50px) scale(0.5);
				transform-origin: top right;
				transition:
					opacity 1s ease,
					transform 1s ease;

				@media (max-width: 768px) {
					height: 15rem;
				}
			}

			.image-3 {
				height: 22rem;
				width: 21.875rem;
				opacity: 0;
				transform: translateX(-50px) translateY(50px) scale(0.5);
				transform-origin: bottom left;
				transition:
					opacity 1s ease,
					transform 1s ease;

				@media (max-width: 768px) {
					height: 17rem;
				}
			}

			.image-4 {
				height: 10rem;
				width: 14.9375rem;
				opacity: 0;
				transform: translateX(50px) translateY(50px) scale(0.5);
				transform-origin: bottom right;
				transition:
					opacity 1s ease,
					transform 1s ease;
			}
		}

		.first-row {
			align-items: flex-end;
		}

		&.animation {
			.first-row,
			.second-row {
				.image-1,
				.image-2,
				.image-3,
				.image-4 {
					opacity: 1;
					transform: none;
					transition-delay: 0.5s;
				}
			}
		}
	}

	.links {
		@media (max-width: 768px) {
			flex-direction: column;
		}
	}
</style>
