<script>
	import { onMount } from "svelte";

	let submissions = $state([]);
	let loading = $state(true);
	let error = $state(null);

	const loadSubmissions = async () => {
		try {
			const res = await fetch("/dashboard/api/contact");

			if (!res.ok) {
				throw new Error("Failed to load contact submissions");
			}

			const data = await res.json();
			submissions = data;
		} catch (err) {
			console.error(err);
			error = "Kunde inte hämta meddelanden just nu.";
		} finally {
			loading = false;
		}
	};

	const formatDate = (isoString) => {
		if (!isoString) return "";

		return new Intl.DateTimeFormat("sv-SE", {
			dateStyle: "short",
			timeStyle: "short",
		}).format(new Date(isoString));
	};

	onMount(() => {
		loadSubmissions();
	});
</script>

<div class="cwcms-header">
	<div class="cwcms-header-module-title">Kontaktformulär</div>
</div>

<div class="cwcms-main contact">
	<div class="table-card">
		{#if loading}
			<p class="status">Laddar kontaktformulär...</p>
		{:else if error}
			<p class="status error">{error}</p>
		{:else if submissions.length === 0}
			<p class="status p-1">Inga meddelanden har skickats in ännu.</p>
		{:else}
			<div class="table-wrapper">
				<table class="submission-table">
					<thead>
						<tr>
							<th>Namn</th>
							<th>E-post</th>
							<th>Telefon</th>
							<th>Meddelande</th>
							<th>Mottaget</th>
						</tr>
					</thead>
					<tbody>
						{#each submissions as submission}
							<tr>
								<td>{submission.name}</td>
								<td>
									{#if submission.email}
										<a
											class="email-link"
											href={`mailto:${submission.email}`}
											>{submission.email}</a
										>
									{/if}
								</td>
								<td>
									{#if submission.phone}
										<a
											class="phone-link"
											href={`tel:${submission.phone}`}
											>{submission.phone}</a
										>
									{/if}
								</td>
								<td class="message">{submission.message}</td>
								<td>{formatDate(submission.createdAt)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

<style>
	.cwcms-main.contact {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.table-card {
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: rgba(22, 22, 24, 0.06) 0px 1px 2px 0px;
	}

	.status {
		margin: 0;
		font-size: 14px;
		padding: 1rem;
		color: var(--color-text);
	}

	.status.error {
		color: #c92a2a;
	}

	.table-wrapper {
		overflow-x: auto;
	}

	.submission-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
		min-width: 720px;
	}

	.submission-table thead {
		background-color: var(--color-bg-secondary);
	}

	.submission-table th,
	.submission-table td {
		text-align: left;
		padding: 12px;
		border-bottom: 1px solid var(--color-border);
		vertical-align: top;
	}

	.submission-table tbody tr:last-child td {
		border-bottom: none;
	}

	.submission-table a {
		color: inherit;
		text-decoration: none;
	}

	.submission-table a:hover {
		text-decoration: underline;
	}

	.submission-table .message {
		max-width: 360px;
		white-space: pre-wrap;
	}

	.email-link,
	.phone-link {
		color: var(--color-accent) !important;
	}
</style>
