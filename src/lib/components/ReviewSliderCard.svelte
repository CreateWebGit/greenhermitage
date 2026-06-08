<script>
	let { review, prevReview, nextReview } = $props();

	import StarRating from "./StarRating.svelte";

	const formatDateToDDMMYY = (isoString) => {
		const date = new Date(isoString);

		const day = String(date.getUTCDate()).padStart(2, "0");
		const month = String(date.getUTCMonth() + 1).padStart(2, "0");
		const year = String(date.getUTCFullYear()).slice(-2);

		return `${day}/${month}/${year}`;
	};
</script>

<div class="review-slider-card">
	<StarRating rating={review.rating} />
	<div class="review-text">
		<p>
			{review.text}
		</p>
	</div>
	<div class="bottom-container">
		<div class="name-date">
			<p class="name">{review.name}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.review-slider-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: #dddacf8a;
		padding: 2rem;
		border-radius: 1rem;
		flex: 1 0 80%;
		scroll-snap-align: center;

		@media (max-width: 768px) {
			&:first-of-type {
				margin-left: 2rem;
			}

			&:last-of-type {
				margin-right: 2rem;
			}
		}

		.review-text {
			min-height: 12rem;
			p {
				color: var(--color-green);
				font-family: "Caveat";
				font-size: 2rem;
				line-height: 1.15;

				@media (max-width: 768px) {
					font-size: 32px;
				}
			}
		}

		.bottom-container {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name-date {
				.name {
				}

				.date {
					font-size: 0.75rem;
					font-weight: 600;
					opacity: 0.25;
				}
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
</style>
