<script>
	import "../../css/main.scss";

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import SectionReviews from "$lib/components/sections/SectionReviews.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import BookingForm from "$lib/components/BookingForm.svelte";
	import { language } from "$lib/stores/languageStore";

	let { data } = $props();
	let { reviews, images } = data;

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);
	const baseUrl = "https://greenhermitage.se";
	const canonicalUrl = `${baseUrl}/boka-bord`;

	$effect(() => {
		currentLanguage = $language;
	});
</script>

<svelte:head>
	<title>{t("Boka bord | Green Hermitage", "Book a table | Green Hermitage")}</title>
	<meta
		name="description"
		content={t(
			"Boka bord hos Green Hermitage i Gamla Stan, Stockholm.",
			"Book a table at Green Hermitage in Gamla Stan, Stockholm.",
		)}
	/>
	<link rel="canonical" href={canonicalUrl} />

	<meta
		property="og:title"
		content={t("Boka bord | Green Hermitage", "Book a table | Green Hermitage")}
	/>
	<meta
		property="og:description"
		content={t(
			"Boka bord hos Green Hermitage i Gamla Stan, Stockholm.",
			"Book a table at Green Hermitage in Gamla Stan, Stockholm.",
		)}
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Green Hermitage" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={t("Boka bord | Green Hermitage", "Book a table | Green Hermitage")}
	/>
	<meta
		name="twitter:description"
		content={t(
			"Boka bord hos Green Hermitage i Gamla Stan, Stockholm.",
			"Book a table at Green Hermitage in Gamla Stan, Stockholm.",
		)}
	/>
</svelte:head>

<Header />
<Hero
	title={t("Boka bord", "Book a table")}
	backgroundImage={"/images/header-boka-bord.webp"}
	height={400}
/>

<section class="cw-section--book cw-grid">
	<div class="cw-cs-2 cw-ce-12 grid-col cw-col-xs-12">
		<BookingForm />
	</div>
</section>

<SectionReviews images={images[0].slider} {reviews} />
<Footer />

<style lang="scss">
	.cw-section--book {
		height: 15.625rem;
		margin-top: calc(-15.625rem / 2);
		border-radius: 1rem;
	}

	.grid-col {
		background: white;
		border-radius: 1rem;
	}
</style>
