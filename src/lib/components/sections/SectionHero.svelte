<script>
	import { language } from "$lib/stores/languageStore";

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});
</script>

<section class="cw-section--hero full-width">
	<div class="content-container">
		<img
			class="google-reviews mb-3"
			src="/images/google-reviews.svg"
			alt="hermitage logo"
		/>
		<img
			class="logo mb-2"
			src="/hermitage-logo-full.svg"
			alt="hermitage logo"
		/>
		<p class="text-white text-center mb-4">
			{t(
				"Vi erbjuder vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan i Stockholm. Till oss ska den med hunger gå. Känner du att det kurrar i magen? Styr då din kosa hit och njut av vår vegetariska buffé.",
				"We offer vegetarian food made with love in a cozy setting in Gamla Stan, Stockholm. If you’re hungry, this is the place to be. Feeling your stomach growl? Then head our way and enjoy our vegetarian buffet.",
			)}
		</p>
		<div class="button-container">
			<button class="primary">{t("Boka bord", "Book a table")}</button>
			<button class="secondary white">{t("Vår meny", "Our menu")}</button>
		</div>
	</div>

	<div class="quote-card">
		<p>
			{#if currentLanguage === "en"}
				We are constantly working to improve the planet we live on and
				work in the name of the environment. That's why up to <span
					class="text-orange">50% of our dishes are organic.</span
				>
			{:else}
				Vi jobbar ständigt med att förbättra den planet vi lever på och
				jobbar i miljöns tecken. Därför är upp till <span
					class="text-orange">50% av våra rätter ekologiska.</span
				>
			{/if}
		</p>
	</div>
</section>
