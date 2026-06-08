<script>
	import "../../css/main.scss";

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import SectionReviews from "$lib/components/sections/SectionReviews.svelte";
	import Divider from "$lib/components/Divider.svelte";
	import { language } from "$lib/stores/languageStore";

	import Slider from "$lib/components/Slider";

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});

	let { data } = $props();
	let { reviews, images, buffetMenu } = data;

	let currentMenuTab = $state("lunch");

	const sliderData = $derived({ slideshow: buffetMenu.lunch.images });
	const baseUrl = "https://greenhermitage.se";
	const canonicalUrl = `${baseUrl}/buffe-meny`;
</script>

<svelte:head>
	<title
		>{t(
			"Buffé meny | Green Hermitage",
			"Buffet menu | Green Hermitage",
		)}</title
	>
	<meta
		name="description"
		content={t(
			"Se buffémeny, öppettider och priser på Green Hermitage i Gamla Stan.",
			"See the buffet menu, opening hours, and prices at Green Hermitage in Gamla Stan.",
		)}
	/>
	<link rel="canonical" href={canonicalUrl} />

	<meta
		property="og:title"
		content={t(
			"Buffé meny | Green Hermitage",
			"Buffet menu | Green Hermitage",
		)}
	/>
	<meta
		property="og:description"
		content={t(
			"Se buffémeny, öppettider och priser på Green Hermitage i Gamla Stan.",
			"See the buffet menu, opening hours, and prices at Green Hermitage in Gamla Stan.",
		)}
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Green Hermitage" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={t(
			"Buffé meny | Green Hermitage",
			"Buffet menu | Green Hermitage",
		)}
	/>
	<meta
		name="twitter:description"
		content={t(
			"Se buffémeny, öppettider och priser på Green Hermitage i Gamla Stan.",
			"See the buffet menu, opening hours, and prices at Green Hermitage in Gamla Stan.",
		)}
	/>
</svelte:head>

<Header />
<Hero
	title={t("Buffé", "Buffet")}
	backgroundImage={"/images/header-lunch.webp"}
/>

<section class="cw-section cw-grid py-4 pb-10">
	<div class="cw-col-12 cw-col-xs-12 d-flex flex-column">
		<h1 class="h2 text-center mt-2">Buffé meny</h1>
		<img
			class="mx-auto mt-1 mb-3"
			src="/icons/divider.svg"
			alt="divider icon"
		/>
	</div>
	<div class="slider-container cw-col-12 cw-col-xs-12 mt-2">
		<Slider
			variant="slideshow"
			navigationVariant="inset"
			autoPlay
			autoPlayDuration={5000}
			showIndicators
			dataSource="parent"
			data={sliderData}
		/>
	</div>

	<div class="cw-col-12 cw-col-xs-12">
		<h3 class="text-center mt-4 mb-2">
			{t(
				"Bufféns innehåll & öppettider",
				"Buffet contents & opening hours",
			)}
		</h3>
		<Divider marginTop={0} marginBottom={0} />

		{#if !buffetMenu.sameMenu}
			<div class="dish-category-tabs-container pt-4">
				<button
					onclick={() => (currentMenuTab = "lunch")}
					class="menu-tab"
					class:active={currentMenuTab === "lunch"}
					>Lunch buffé</button
				>
				<button
					onclick={() => (currentMenuTab = "dinner")}
					class:active={currentMenuTab === "dinner"}
					class="menu-tab">Middags buffé</button
				>
			</div>
		{/if}
		<div class="menu-container py-4 py-xs-4 pb-6">
			{#if buffetMenu.sameMenu}
				{#each buffetMenu.lunch.items as menuItem}
					<!-- <p>{menuItem.title.sv}</p>
					<p>{menuItem.description.sv}</p> -->

					<div class="menu-item">
						<h3>{menuItem.title[currentLanguage]}</h3>
						<p>{menuItem.description[currentLanguage]}</p>
					</div>
				{/each}
			{/if}

			{#if !buffetMenu.sameMenu}
				{#if currentMenuTab === "lunch"}
					{#each buffetMenu.lunch.items as menuItem}
						<div class="menu-item">
							<h3>{menuItem.title[currentLanguage]}</h3>
							<p>{menuItem.description[currentLanguage]}</p>
						</div>
					{/each}
				{/if}

				{#if currentMenuTab === "dinner"}
					{#each buffetMenu.dinner.items as menuItem}
						<div class="menu-item">
							<h3>{menuItem.title[currentLanguage]}</h3>
							<p>{menuItem.description[currentLanguage]}</p>
						</div>
					{/each}
				{/if}
			{/if}
		</div>
	</div>
	<div class="buffet-info-box cw-col-6 cw-col-xs-12 pb-xs-4">
		<h3 class="title">Lunch</h3>

		<div class="opening-hours">
			<p class="opening-hours-title">
				{t("Öppettider", "Opening hours")}
			</p>
			<p>
				{t("Mån - Fre:", "Mon - Fri:")}
				{buffetMenu.lunch.openingHours.weekday.from} - {buffetMenu.lunch
					.openingHours.weekday.to}
			</p>
			<p>
				{t("Lör - Sön:", "Sat - Sun:")}
				{buffetMenu.lunch.openingHours.weekend.from} - {buffetMenu.lunch
					.openingHours.weekend.to}
			</p>
		</div>

		<div class="price-container">
			<p>{t("Pris per person", "Price per person")}</p>
			<h3>{buffetMenu.lunch.price} SEK</h3>
		</div>
	</div>
	<div class="buffet-info-box cw-col-6 cw-col-xs-12 pb-xs-4">
		<h3 class="title">{t("Middag", "Dinner")}</h3>

		<div class="opening-hours">
			<p class="opening-hours-title">
				{t("Öppettider", "Opening hours")}
			</p>
			<p>
				{t("Mån - Fre:", "Mon - Fri:")}
				{buffetMenu.dinner.openingHours.weekday.from} - {buffetMenu
					.dinner.openingHours.weekday.to}
			</p>
			<p>
				{t("Lör - Sön:", "Sat - Sun:")}
				{buffetMenu.dinner.openingHours.weekend.from} - {buffetMenu
					.dinner.openingHours.weekend.to}
			</p>
		</div>

		<div class="price-container">
			<p>{t("Pris per person", "Price per person")}</p>
			<h3>{buffetMenu.dinner.price} SEK</h3>
		</div>
	</div>
</section>

{#if images}
	<SectionReviews images={images[0].slider} {reviews} />
{/if}
<Footer />

<style lang="scss">
	.image-container {
		width: 100%;
		height: 100%;
		max-height: 30rem;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow:
			0px 100px 80px rgba(0, 0, 0, 0.07),
			0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
			0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
			0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
			0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
			0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.slider-container {
		position: relative;

		&::after {
			content: "";
			height: calc(50% + 1.5rem);
			width: 25%;
			position: absolute;
			top: -1.5rem;
			left: -1.5rem;
			z-index: 1;
			border-top: 4px solid #5f6952;
			border-left: 4px solid #5f6952;
			opacity: 0.45;
			pointer-events: none;
		}

		&::before {
			content: "";
			width: 25%;
			height: calc(50% + 1.5rem);
			position: absolute;
			bottom: -1.5rem;
			right: -1.5rem;
			z-index: 1;
			border-bottom: 4px solid #5f6952;
			border-right: 4px solid #5f6952;
			opacity: 0.45;
			pointer-events: none;
		}
	}

	.menu-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}

		.menu-item {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;

			h3 {
				font-family: "Forum";
				font-size: 1.5rem;
			}

			p {
				font-size: 0.875rem;
			}
		}
	}

	.buffet-info-box {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		text-align: center;

		.opening-hours {
			font-family: "Forum";
		}
	}

	.dish-category-tabs-container {
		display: flex;
		justify-content: center;
		gap: 1rem;

		@media (max-width: 768px) {
			justify-content: flex-start;
			overflow-x: scroll;
			padding-bottom: 2rem;
			margin-bottom: 2rem;
		}

		.menu-tab {
			all: unset;
			font-family: "Forum";
			font-size: 28px;
			position: relative;
			text-transform: uppercase;
			color: var(--color-green);
			opacity: 0.5;
			cursor: pointer;

			@media (max-width: 768px) {
				/* display: none; */
			}

			&::after {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				height: 16px;
				width: 32px;
				background-image: url("/icons/square.svg");
				background-position: center;
				background-repeat: no-repeat;
				top: 100%;
				display: none;
			}

			&.active {
				color: var(--color-green);
				opacity: 1;

				&::after {
					display: block;
				}
			}
		}
	}
</style>
