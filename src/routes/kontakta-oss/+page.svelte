<script>
	import "../../css/main.scss";

	import Header from "$lib/components/Header.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import SectionMap from "$lib/components/sections/SectionMap.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Divider from "$lib/components/Divider.svelte";
	import { language } from "$lib/stores/languageStore";

	let name = $state("");
	let email = $state("");
	let phone = $state("");
	let message = $state("");
	let submitting = $state(false);
	let successMessage = $state("");
	let errorMessage = $state("");
	let currentLanguage = $state("sv");
	const t = (sv, en) => (currentLanguage === "en" ? en : sv);
	const baseUrl = "https://greenhermitage.se";
	const canonicalUrl = `${baseUrl}/kontakta-oss`;

	$effect(() => {
		currentLanguage = $language;
	});

	async function handleSubmit() {
		errorMessage = "";
		successMessage = "";
		submitting = true;

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, phone, message }),
			});

			const result = await response.json();

			if (!response.ok || !result?.success) {
				throw new Error(
					result?.message ??
						t(
							"Kunde inte skicka meddelandet. Försök igen.",
							"Could not send the message. Please try again.",
						),
				);
			}

			successMessage = t(
				"Tack för ditt meddelande! Vi hör av oss snart.",
				"Thank you for your message! We will get back to you soon.",
			);
			name = "";
			email = "";
			phone = "";
			message = "";
		} catch (error) {
			errorMessage =
				error?.message ??
				t(
					"Något gick fel. Försök igen senare.",
					"Something went wrong. Please try again later.",
				);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title
		>{t(
			"Kontakta oss | Green Hermitage",
			"Contact us | Green Hermitage",
		)}</title
	>
	<meta
		name="description"
		content={t(
			"Kontakta Green Hermitage med frågor, feedback eller bokningsförfrågningar.",
			"Contact Green Hermitage with questions, feedback, or booking requests.",
		)}
	/>
	<link rel="canonical" href={canonicalUrl} />

	<meta
		property="og:title"
		content={t(
			"Kontakta oss | Green Hermitage",
			"Contact us | Green Hermitage",
		)}
	/>
	<meta
		property="og:description"
		content={t(
			"Kontakta Green Hermitage med frågor, feedback eller bokningsförfrågningar.",
			"Contact Green Hermitage with questions, feedback, or booking requests.",
		)}
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Green Hermitage" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={t(
			"Kontakta oss | Green Hermitage",
			"Contact us | Green Hermitage",
		)}
	/>
	<meta
		name="twitter:description"
		content={t(
			"Kontakta Green Hermitage med frågor, feedback eller bokningsförfrågningar.",
			"Contact Green Hermitage with questions, feedback, or booking requests.",
		)}
	/>
</svelte:head>

<Header />
<Hero
	title={t("Kontakta oss", "Contact us")}
	backgroundImage={"/images/none.webp"}
/>

<section class="cw-section--contact cw-grid py-8 py-xs-5 gap-1">
	<div class="cw-col-6 cw-col-xs-12 cw-c-justify-center flex-column">
		<h3>
			{t(
				"Har du en fråga? Eller någon annan fundering?",
				"Have a question or something on your mind?",
			)}
		</h3>
		<p class="mt-2">
			{t(
				"Tveka inte att höra av dig till oss med hjälp av formuläret här. Så återkommer vi så snart vi kan!",
				"Don’t hesitate to reach out using the form here. We’ll get back to you as soon as we can!",
			)}
		</p>
	</div>
	<div class="cw-col-6 cw-col-xs-12 form pt-xs-2">
		<form class="contact-form" on:submit|preventDefault={handleSubmit}>
			<input
				type="text"
				bind:value={name}
				required
				autocomplete="name"
				placeholder={t("Namn", "Name")}
			/>
			<div class="d-flex">
				<input
					type="email"
					bind:value={email}
					required
					autocomplete="email"
					placeholder={t("E-mail", "Email")}
				/>
				<input
					type="tel"
					bind:value={phone}
					autocomplete="tel"
					placeholder={t("Telefon", "Phone")}
				/>
			</div>
			<textarea
				rows="5"
				bind:value={message}
				required
				placeholder={t("Meddelande", "Message")}
			></textarea>

			<button class="primary" type="submit" disabled={submitting}>
				{submitting
					? t("Skickar…", "Sending…")
					: t("Skicka meddelande", "Send message")}
			</button>
			{#if successMessage}
				<p class="feedback success">{successMessage}</p>
			{/if}
			{#if errorMessage}
				<p class="feedback error">{errorMessage}</p>
			{/if}
		</form>
	</div>
</section>
<Divider></Divider>
<SectionMap />
<Footer />

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: #5f695212;
		padding: 0.5rem;
		border-radius: 0.5rem;

		input[type="text"],
		input[type="email"],
		input[type="tel"],
		textarea {
			appearance: none;
			height: 48px;
			font-size: 0.875rem;
			padding-left: 0.5rem;
			font-family: "Inter";
			border: 0;
			border: 1px solid #e3e3e3;
			border-radius: 0.5rem;
			background-color: #f7f4ed;

			&:focus {
				outline: 1px solid var(--color-accent);
			}
		}

		textarea {
			height: unset;
			padding-top: 0.5rem;
			line-height: 1.5;
			resize: none;
		}

		.d-flex {
			gap: 0.5rem;

			input {
				width: 100%;
			}
		}
	}
</style>
