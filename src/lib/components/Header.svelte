<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { menuPublished } from "$lib/stores/publishedStore";
	import { language } from "$lib/stores/languageStore";

	const normalize = (path) => path.replace(/\/+$/, "").toLowerCase() || "/";
	const isActive = (href) =>
		normalize($page.url.pathname) === normalize(href);

	let mobileSlideMenuActive = $state(false);
	let header;
	let currentLanguage = $state("sv");

	const t = (sv, en) => (currentLanguage === "en" ? en : sv);

	const getNextLanguage = (current) =>
		current === "sv"
			? { code: "en", label: "EN" }
			: { code: "sv", label: "SV" };

	function changeLanguage(code) {
		language.set(code === "en" ? "en" : "sv");
		if (mobileSlideMenuActive) {
			handleToggleSlideMenu();
		}
	}

	function setThemeColor(color) {
		let meta = document.querySelector('meta[name="theme-color"]');
		if (!meta) {
			meta = document.createElement("meta");
			meta.setAttribute("name", "theme-color");
			document.head.appendChild(meta);
		}
		meta.setAttribute("content", color);
	}

	function handleToggleSlideMenu() {
		mobileSlideMenuActive = !mobileSlideMenuActive;

		if (mobileSlideMenuActive) {
			header.classList.remove("at-top");
			document.querySelector("html").style.overflow = "hidden";
			setThemeColor("#101010");
		}

		if (!mobileSlideMenuActive) {
			document.querySelector("html").removeAttribute("style");

			if (window.scrollY <= 150) {
				console.log("at top");
				setThemeColor("#5F6952");
				setTimeout(() => {
					header.classList.add("at-top");
				}, 1);
			} else {
				setThemeColor("#F2EEE4");
				header.classList.remove("at-top");
			}
		}
	}

	onMount(() => {
		let prevScrollpos = 0;
		let header = document.getElementById("gh-header");

		function handleHeaderScroll() {
			let currentScrollPos = window.scrollY;

			if (currentScrollPos > 0 && currentScrollPos < 150) {
				header.classList.add("at-top");
				setThemeColor("#5F6952");
			} else if (currentScrollPos === 0) {
				header.classList.add("at-top");
				setThemeColor("#5F6952");
			} else {
				header.classList.remove("at-top");
			}

			if (prevScrollpos <= currentScrollPos) {
				setThemeColor("#F2EEE4");
				header.classList.add("scrolled");
			} else {
				header.classList.remove("scrolled");
			}

			prevScrollpos = currentScrollPos;
		}

		window.addEventListener("scroll", handleHeaderScroll);

		if (window.scrollY != 0) {
			header.classList.remove("at-top");
		}
	});

	$effect(() => {
		currentLanguage = $language;
	});
</script>

<header
	bind:this={header}
	id="gh-header"
	class={mobileSlideMenuActive ? "mobile-slide-menu-active" : "" + "at-top"}
>
	<div class="logo-container">
		<a href="/">
			<img src="/hermitage-logo-white.svg" alt="hermitage-logo" />
		</a>
	</div>
	<div class="nav-container">
		<nav>
			<ul>
				{#if $menuPublished?.[0]?.published}
					<li>
						<a class:active={isActive("/meny")} href="/meny"
							>{t("À la carte meny", "À la carte menu")}</a
						>
					</li>
				{/if}
				<li>
					<a class:active={isActive("/buffe-meny")} href="/buffe-meny"
						>{t("Buffé meny", "Buffet menu")}</a
					>
				</li>
				<li>
					<a class:active={isActive("/boka-bord")} href="/boka-bord"
						>{t("Boka bord", "Book a table")}</a
					>
				</li>
				<li>
					<a
						class:active={isActive("/recensioner")}
						href="/recensioner">{t("Recensioner", "Reviews")}</a
					>
				</li>
				<li>
					<a
						class:active={isActive("/kontakta-oss")}
						href="/kontakta-oss"
						>{t("Kontakta oss", "Contact us")}</a
					>
				</li>
			</ul>
		</nav>
	</div>
	<div class="menu-container">
		<div class="language-switcher hide-mobile">
			<button
				type="button"
				class="language-button"
				onclick={() => changeLanguage(getNextLanguage($language).code)}
			>
				{getNextLanguage($language).label}
			</button>
		</div>
		<button
			onclick={() => handleToggleSlideMenu()}
			class="hamburger hamburger--spin {mobileSlideMenuActive
				? 'is-active'
				: ''} hide-desktop"
			aria-label="button to toggle slide menu"
		>
			<span class="hamburger-box">
				<span class="hamburger-inner"></span>
			</span>
		</button>
	</div>
</header>

<div class="mobile-slide-menu {mobileSlideMenuActive ? 'open' : ''}">
	<div class="content">
		<div class="top-container">
			<nav class="mobile-nav">
				{#if $menuPublished?.[0]?.published}
					<a
						href="/meny"
						class:active={isActive("/meny")}
						onclick={() => handleToggleSlideMenu()}
						>{t("Á la carte meny", "À la carte menu")}</a
					>
				{/if}
				<a
					href="/buffe-meny"
					class:active={isActive("/buffe-meny")}
					onclick={() => handleToggleSlideMenu()}
					>{t("Buffé meny", "Buffet menu")}</a
				>
				<a
					href="/boka-bord"
					class:active={isActive("/boka-bord")}
					onclick={() => handleToggleSlideMenu()}
					>{t("Boka bord", "Book a table")}</a
				>
				<a
					href="/recensioner"
					class:active={isActive("/recensioner")}
					onclick={() => handleToggleSlideMenu()}
					>{t("Recensioner", "Reviews")}</a
				>
				<a
					href="/kontakta-oss"
					class:active={isActive("/kontakta-oss")}
					onclick={() => handleToggleSlideMenu()}
					>{t("Kontakta oss", "Contact us")}</a
				>
			</nav>

			<div class="language-switcher mobile-only">
				<button
					type="button"
					class="language-button"
					onclick={() =>
						changeLanguage(getNextLanguage($language).code)}
				>
					{getNextLanguage($language).label}
				</button>
			</div>

			<!-- <div class="button-container">
                <a href="#kontakt" onclick={() => handleToggleSlideMenu()} class="button primary mx-auto">Kontakta oss idag</a>
            </div> -->
		</div>
	</div>
</div>

<style>
	.language-switcher {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.language-button {
		border: 1px solid rgba(255, 255, 255, 0.4);
		background: transparent;
		color: inherit;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		height: 2.625rem;
		width: 2.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.language-button.active {
		background: rgba(255, 255, 255, 0.2);
	}

	.language-switcher.hide-mobile {
		margin-right: 1rem;
	}

	.mobile-only {
		display: none;
		margin-top: 1rem;
	}

	@media screen and (max-width: 768px) {
		.hide-mobile {
			display: none;
		}
		.mobile-only {
			display: flex;
			justify-content: center;
		}
	}

	@media screen and (min-width: 769px) {
		.mobile-only {
			display: none;
		}
	}
</style>
