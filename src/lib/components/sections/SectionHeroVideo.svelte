<script>
	import { language } from "$lib/stores/languageStore";
	let currentLanguage = $state("sv");
	let lastScrollY = 0;

	function inView(node) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const currentScrollY = window.scrollY;
					if (entry.isIntersecting) {
						node.classList.add("visible");
					} else if (currentScrollY < lastScrollY) {
						node.classList.remove("visible");
					}

					lastScrollY = currentScrollY;
				});
			},
			{ threshold: 1 }, // 20% visible triggers
		);

		observer.observe(node);

		return {
			destroy() {
				observer.unobserve(node);
			},
		};
	}

	$effect(() => {
		currentLanguage = $language;
	});
</script>

<section class="cw-section--hero full-width" style="background-image: none">
	<div class="content-container">
		<a
			href="https://www.google.com/search?sa=X&sca_esv=fc287096e33095a1&sxsrf=AE3TifOvywnKQLJjn6N56l-uc7JTR80qvA:1766961436215&q=Vegan-Vegetarian+Restaurant+Hermitage+Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2M7W0NDYxNzE2NjA0MjY1NLEw3cDI-IpRNyw1PTEPRKaWJBZlJuYpBKUWlySWFiXmlSh4pBblZpYkpqcCBcsyU8uLF7GSph4AXct4N3oAAAA&rldimm=6599347433012351485&tbm=lcl&hl=en-SE&ved=2ahUKEwjc7_KlrOGRAxUoKxAIHWlPDcIQ9fQKegQIXxAG&biw=1694&bih=966&dpr=2#lkt=LocalPoiReviews"
			target="_blank"
		>
			<img
				class="google-reviews mb-3"
				src="/images/google-reviews.svg"
				alt="hermitage logo"
			/>
		</a>
		<img
			class="logo mb-2"
			src="/hermitage-logo-full.svg"
			alt="hermitage logo"
		/>
		<p class="text-white text-center mb-4">
			{currentLanguage === "en"
				? "We offer vegetarian food made with love in a cozy setting in Gamla Stan, Stockholm. If you’re hungry, this is the place to be. Feeling your stomach growl? Then head our way and enjoy our vegetarian buffet."
				: "Vi erbjuder vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan i Stockholm. Till oss ska den med hunger gå. Känner du att det kurrar i magen? Styr då din kosa hit och njut av vår vegetariska buffé."}
		</p>
		<div class="button-container">
			<a href="/boka-bord" class="button primary"
				>{currentLanguage === "en" ? "Book a table" : "Boka bord"}</a
			>
			<a href="lunch-meny" class="button secondary white"
				>{currentLanguage === "en" ? "Our menu" : "Vår meny"}</a
			>
		</div>
	</div>

	<video
		src="/videos/hermitage-hero-video.mp4"
		autoplay
		playsinline
		muted
		loop
	></video>

	<div class="quote-card" use:inView>
		<!-- <p>Vi jobbar ständigt med att förbättra den planet vi lever på och jobbar i miljöns tecken. Därför är upp till <span class="text-orange">50% av våra rätter ekologiska.</span></p> -->
		{#if currentLanguage === "en"}
			<p>
				We are constantly working to improve the planet we live on and
				work in the name of the environment. That's why up to <span
					class="text-orange">50% of our dishes are organic.</span
				>
			</p>
		{:else}
			<p>
				Vi jobbar ständigt med att förbättra den planet vi lever på och
				jobbar i miljöns tecken. Därför är upp till <span
					class="text-orange">50% av våra rätter ekologiska.</span
				>
			</p>
		{/if}
	</div>
</section>
