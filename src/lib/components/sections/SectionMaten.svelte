<script>
	import ScrollTest from "../ScrollTest.svelte";
	import { language } from "$lib/stores/languageStore";

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});
</script>

<section class="cw-section--maten cw-grid pb-8">
	<div class="cw-col-7 cw-col-xs-12">
		<p class="h6 text-orange mb-1">{t("MATEN", "THE FOOD")}</p>
		<h1>
			{#if currentLanguage === "en"}
				Our passion for plant-based <br />cooking
			{:else}
				Vår passion för växtbaserad <br />matlagning
			{/if}
		</h1>
		<p class="mt-4 body-text-line-height">
			{t(
				"På Hermitage, tror vi på att ge näring till både kropp och själ. Vår meny är omsorgsfullt gjord med färska, säsongsbetonade råvaror från lokala gårdar. Oavsett om du är en livslång vegetarian eller bara utforskar en växtbaserad kost, erbjuder vi något för alla smaker.",
				"At Hermitage, we believe in nourishing both body and soul. Our menu is thoughtfully crafted with fresh, seasonal ingredients from local farms. Whether you are a lifelong vegetarian or simply exploring a plant-based diet, we offer something for every taste.",
			)}
		</p>
	</div>
	<div class="cw-col-5 cw-col-xs-12 aspect-ratio-1-1 overflow-hidden">
		<!-- <img class="cw-col-img" src="/images/vegmeal.webp" alt="a plate."/> -->
		<ScrollTest />
	</div>
	<div class="cw-col-12 cw-col-xs-12 shadow-hard dude hide-mobile">
		<img
			class="cw-col-img border-radius"
			src="/images/dude.webp"
			alt="dude rummaging through a planter"
		/>
	</div>
</section>

<style lang="scss">
	.dude {
		@media (max-width: 768px) {
			height: 20rem;
			margin-right: -2rem;
			margin-top: 2rem;

			img {
				border-radius: 0;
				border-top-left-radius: 1rem;
				object-position: 80%;
			}
		}
	}
</style>
