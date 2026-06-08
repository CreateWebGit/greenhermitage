<script>
	import "../../css/main.scss";

	let { data } = $props();
	let { reviews } = $state(data);

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import StarRating from "../../lib/components/StarRating.svelte";
	import { language } from "$lib/stores/languageStore";

	// form state
	let name = $state("");
	let rating = $state(0);
	let text = $state("");
	let submitting = $state(false);
	let success = $state(false);
	let error = $state("");
	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);
	const baseUrl = "https://greenhermitage.se";
	const canonicalUrl = `${baseUrl}/recensioner`;

	$effect(() => {
		currentLanguage = $language;
	});

	const submitReview = async () => {
		error = "";
		success = false;

		const trimmedName = name.trim();
		const trimmedText = text.trim();
		const numRating = Number(rating);

		if (!trimmedName || !trimmedText || !Number.isFinite(numRating)) {
			error = t(
				"Fyll i namn, betyg och en kommentar.",
				"Please enter a name, rating, and a comment.",
			);
			return;
		}
		if (numRating < 1 || numRating > 5) {
			error = t(
				"Betyg måste vara mellan 1 och 5.",
				"Rating must be between 1 and 5.",
			);
			return;
		}

		submitting = true;
		try {
			const res = await fetch("/api/reviews", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: trimmedName,
					text: trimmedText,
					rating: numRating,
				}),
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(
					body.message ||
						t(
							"Kunde inte skicka recensionen.",
							"Could not submit the review.",
						),
				);
			}

			const { review } = await res.json();
			// optimistic prepend
			reviews = [review, ...reviews];
			name = "";
			text = "";
			rating = 5;
			success = true;
		} catch (e) {
			error = e.message || t("Ett fel inträffade.", "An error occurred.");
		} finally {
			submitting = false;
		}
	};
</script>

<svelte:head>
	<title
		>{t(
			"Recensioner | Green Hermitage",
			"Reviews | Green Hermitage",
		)}</title
	>
	<meta
		name="description"
		content={t(
			"Läs vad våra gäster tycker och lämna en recension.",
			"Read what our guests think and leave a review.",
		)}
	/>
	<link rel="canonical" href={canonicalUrl} />

	<meta
		property="og:title"
		content={t(
			"Recensioner | Green Hermitage",
			"Reviews | Green Hermitage",
		)}
	/>
	<meta
		property="og:description"
		content={t(
			"Läs vad våra gäster tycker och lämna en recension.",
			"Read what our guests think and leave a review.",
		)}
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Green Hermitage" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={t(
			"Recensioner | Green Hermitage",
			"Reviews | Green Hermitage",
		)}
	/>
	<meta
		name="twitter:description"
		content={t(
			"Läs vad våra gäster tycker och lämna en recension.",
			"Read what our guests think and leave a review.",
		)}
	/>
</svelte:head>

<Header />
<Hero
	title={t("Recensioner", "Reviews")}
	backgroundImage={"/images/header-recensioner.webp"}
/>

<section class="cw-section--all-reviews cw-grid py-5">
	<div class="cw-col-12 cw-col-xs-12 d-flex flex-column">
		<h1 class="h2 text-center">
			{t("Vad våra gäster tycker...", "What our guests think...")}
		</h1>
		<img
			class="mx-auto mt-1 mb-5"
			src="/icons/divider.svg"
			alt="divider icon"
		/>
	</div>
	<div class="cw-col-8 cw-col-xs-12">
		<div class="reviews-container">
			{#each reviews as review}
				<div class="review-card">
					<div class="review">
						<p>
							{#if review.text != " "}
								"{review.text}"
							{/if}
						</p>

						{#if review.reply}
							<p>
								<span style="opacity: 0.5">
									{t(
										"Restaurangen svarar",
										"The restaurant replies",
									)}:
								</span>
								{review.reply.text}
							</p>
						{/if}
					</div>
					<div class="bottom-container">
						<StarRating rating={review.rating} />
						<p>{review.name}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="cw-col-4 cw-col-xs-12">
		<div class="review-form">
			{#if success}
				<p class="success">
					{t(
						"Tack! Din recension är skickad.",
						"Thank you! Your review has been sent.",
					)}
				</p>
			{/if}
			{#if error}
				<p class="error">{error}</p>
			{/if}

			<form
				on:submit|preventDefault={submitReview}
				aria-label={t("Skicka recension", "Submit review")}
			>
				<label>
					{t("Namn", "Name")}
					<input
						type="text"
						bind:value={name}
						placeholder={t("Ditt namn", "Your name")}
						disabled={submitting}
					/>
				</label>

				<label>
					{t("Betyg", "Rating")}
					<div class="rating-input">
						{#each [1, 2, 3, 4, 5] as r}
							<button
								type="button"
								class="star {r <= rating ? 'filled' : ''}"
								on:click={() => (rating = r)}
								aria-label={t(`Betyg ${r}`, `Rating ${r}`)}
								disabled={submitting}
							>
								★
							</button>
						{/each}
						<span class="rating-value">{rating}/5</span>
					</div>
				</label>

				<label>
					{t("Kommentar", "Comment")}
					<textarea
						rows="4"
						bind:value={text}
						placeholder={t(
							"Skriv din recension",
							"Write your review",
						)}
						disabled={submitting}
					></textarea>
				</label>

				<button class="primary" type="submit">
					{#if submitting}{t("Skickar…", "Sending…")}{/if}
					{#if !submitting}{t(
							"Skicka recension",
							"Submit review",
						)}{/if}
				</button>
			</form>
		</div>
	</div>
</section>
<Footer />

<style lang="scss">
	.reviews-container {
		display: flex;
		flex-wrap: nowrap;
		gap: 1rem;
		display: grid;
		padding: 0 1rem;

		.review-card {
			border: 1px solid #5f69522b;
			// width: calc(50% - 1rem);
			// aspect-ratio: 1 / 1;
			border-radius: 0.5rem;
			display: grid;
			grid-template-rows: 1fr max-content;
			overflow: hidden;

			.review {
				padding: 2rem 1rem;
				display: grid;
				background-color: var(--color-bg-secondary);

				p {
					font-size: 22px;
					font-family: "Forum";
					text-wrap: balance;
				}
			}

			.bottom-container {
				border-top: 1px solid #5f69522b;
				display: flex;
				padding: 0.5rem;
				flex-direction: column;
			}
		}
	}

	.cw-col-4 {
		.review-form {
			position: sticky;
			top: 64px;
			border: 1px solid #5f69522b;
			border-radius: 0.5rem;
			padding: 1rem;
			background-color: var(--color-bg-secondary);
			height: calc(100vh - 128px);

			h3 {
				margin: 0 0 0.25rem 0;
			}
			.muted {
				color: var(--color-text-muted);
				margin: 0 0 1rem 0;
			}

			form {
				display: flex;
				flex-direction: column;
				font-family: "Forum";
				gap: 1.5rem;

				label {
					display: grid;
					gap: 0.25rem;
					font-weight: 500;
					font-size: 1.25rem;
				}
				input {
					height: 48px;
				}
				input,
				textarea {
					border: 1px solid #5f69522b;
					border-radius: 6px;
					padding: 0.6rem 0.7rem;
					background: white;
					width: 100%;
					font-family: "Inter";
					resize: none;
					line-height: 1.5;

					&:focus {
						outline: 1px solid var(--color-green);
					}
				}

				.rating-input {
					display: flex;
					align-items: center;
					gap: 0.25rem;
					.star {
						appearance: none;
						border: none;
						background: transparent;
						font-size: 1.3rem;
						cursor: pointer;
						padding: 0;
						color: #c6c6c6;
						height: unset;
					}
					.star.filled {
						color: #f5a524;
					}
					.rating-value {
						margin-left: auto;
						font-size: 0.9rem;
						color: var(--color-text-muted);
					}
				}

				.error {
					color: #b00020;
				}
				.success {
					color: #1a7f37;
				}
			}
		}
	}
</style>
