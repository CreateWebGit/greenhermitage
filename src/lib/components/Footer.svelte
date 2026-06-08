<script>
	import Divider from "./Divider.svelte";
	import { language } from "$lib/stores/languageStore";

	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	$effect(() => {
		currentLanguage = $language;
	});
</script>

<footer class="gap-2 py-2">
	<div class="cw-grid footer-content">
		<div class="cw-col-12 cw-col-xs-12">
			<img
				class="mb-2"
				src="/hermitage-logo-white.svg"
				alt="hermitage logotyp"
			/>
		</div>
		<div class="cw-col-4 cw-col-xs-12">
			<p class="text-white mb-1">
				{t(
					"Hermitage Vegetariska Restaurang",
					"Hermitage Vegetarian Restaurant",
				)}
			</p>
			<p class="text-muted-white">St. Nygatan 11, Gamla Stan</p>
			<p class="text-muted-white">111 27 Stockholm</p>
			<p class="text-muted-white">08 411-95 00</p>
		</div>
		<div class="cw-col-4 cw-col-xs-12">
			<p class="text-white mb-1">{t("Öppettider", "Opening hours")}</p>
			<p class="text-muted-white">
				{t("Vardagar – 11:00-21:00", "Weekdays – 11:00-21:00")}
			</p>
			<p class="text-muted-white">
				{t("Helger – 12:00-20:00", "Weekends – 12:00-20:00")}
			</p>
		</div>
		<div class="cw-col-4 cw-col-xs-12">
			<p class="text-white mb-1">{t("Sajtkarta", "Sitemap")}</p>
			<p class="text-muted-white">
				<a href="/">{t("Välkommen", "Welcome")}</a>
			</p>
			<p class="text-muted-white">
				<a href="/lunch-meny">{t("Vår meny", "Our menu")}</a>
			</p>
			<p class="text-muted-white">
				<a href="/boka-bord">{t("Boka bord", "Book a table")}</a>
			</p>
			<p class="text-muted-white">
				<a href="/recensioner">{t("Recensioner", "Reviews")}</a>
			</p>
		</div>
		<div class="cw-col-12 cw-col-xs-12">
			<p class="text-white pt-2">&copy; Hermitage 2026</p>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		width: 100%;
		background-color: var(--color-green);
		.footer-content {
			max-width: 75rem;
			margin: auto;
			padding: 2rem;

			@media (max-width: 768px) {
				gap: 2rem;
				padding: 4rem 2rem;
			}
		}

		.text-white {
			font-size: 1rem;
		}

		.text-muted-white {
			font-size: 0.875rem;
			margin-top: 0.45rem;
		}

		a {
			color: inherit;
		}
	}
</style>
