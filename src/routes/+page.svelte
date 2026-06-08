<script>
	import SectionHero from "$lib/components/sections/SectionHero.svelte";
	import SectionHeroVideo from "$lib/components/sections/SectionHeroVideo.svelte";
	import SectionMaten from "$lib/components/sections/SectionMaten.svelte";
	import SectionReviews from "$lib/components/sections/SectionReviews.svelte";
	import SectionMap from "$lib/components/sections/SectionMap.svelte";
	import ScrollTest from "$lib/components/ScrollTest.svelte";

	import Header from "$lib/components/Header.svelte";
	import Divider from "$lib/components/Divider.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import "../css/main.scss";

	let { data } = $props();
	let { reviews, images } = data;

	const baseUrl = "https://greenhermitage.se";
	const canonicalUrl = `${baseUrl}/`;
	const metaTitle =
		"Green Hermitage - Vegetarisk restaurang i Gamla Stan, Stockholm";
	const metaDescription =
		"Vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan i Stockholm.";
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={metaDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Green Hermitage" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={metaDescription} />
</svelte:head>

<main>
	<Header />
	<SectionHeroVideo />
	<SectionMaten />
	<SectionReviews images={images[0].slider} {reviews} />
	<SectionMap />
	<Footer />
</main>
