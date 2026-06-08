<script>
	import { goto } from "$app/navigation";

	let currentPassword = $state("");
	let newPassword = $state("");
	let confirmPassword = $state("");
	let error = $state("");
	let isSubmitting = $state(false);

	async function handleSubmit(event) {
		event.preventDefault();
		error = "";

		if (newPassword !== confirmPassword) {
			error = "De nya lösenorden matchar inte.";
			return;
		}

		isSubmitting = true;

		try {
			const changePasswordResponse = await fetch(
				"/api/auth/change-password",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						currentPassword,
						newPassword,
						revokeOtherSessions: true,
					}),
				},
			);

			if (!changePasswordResponse.ok) {
				const data = await changePasswordResponse
					.json()
					.catch(() => ({}));
				error = data.message || "Kunde inte byta lösenord.";
				return;
			}

			const completeResponse = await fetch(
				"/dashboard/api/change-password-complete",
				{
					method: "POST",
				},
			);

			if (!completeResponse.ok) {
				const data = await completeResponse.json().catch(() => ({}));
				error =
					data.message ||
					"Lösenordet ändrades, men flaggan kunde inte uppdateras.";
				return;
			}

			await goto("/dashboard");
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="cwcms-main change-password">
	<form class="change-password-card" onsubmit={handleSubmit}>
		<div class="form-header">
			<h1>Byt lösenord</h1>
			<p>Du behöver välja ett nytt lösenord innan du fortsätter.</p>
		</div>

		<label>
			Nuvarande lösenord
			<input
				type="password"
				bind:value={currentPassword}
				autocomplete="current-password"
				required
			/>
		</label>

		<label>
			Nytt lösenord
			<input
				type="password"
				bind:value={newPassword}
				autocomplete="new-password"
				minlength="8"
				required
			/>
		</label>

		<label>
			Bekräfta nytt lösenord
			<input
				type="password"
				bind:value={confirmPassword}
				autocomplete="new-password"
				minlength="8"
				required
			/>
		</label>

		{#if error}
			<p class="error" aria-live="polite">{error}</p>
		{/if}

		<button type="submit" class="primary" disabled={isSubmitting}>
			{isSubmitting ? "Sparar..." : "Spara lösenord"}
		</button>
	</form>
</div>

<style lang="scss">
	.change-password {
		display: grid;
		place-items: center;
	}

	.change-password-card {
		width: min(100%, calc(420px));
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		box-shadow: 0px 0px 0px 100vw #4b4b4b44;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;

		.form-header {
			display: flex;
			flex-direction: column;
			gap: 8px;
			margin-bottom: 8px;

			h1 {
				margin: 0;
				font-size: 24px;
			}

			p {
				margin: 0;
				color: #777;
				font-size: 14px;
			}
		}

		label {
			display: flex;
			flex-direction: column;
			gap: 6px;
			font-size: 13px;
			font-weight: 600;
		}

		.error {
			color: #b64040;
			font-size: 13px;
			font-weight: 600;
			margin: 0;
		}
	}
</style>
