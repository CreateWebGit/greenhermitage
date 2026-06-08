<script>
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { authClient } from "$lib/auth-client";

	let { onNavigate = () => {}, onClose = () => {} } = $props();

	const isActive = (href) => $page.url.pathname.startsWith(href);

	const handleLogout = async () => {
		await authClient.signOut();
		onNavigate();
		await goto("/admin");
	};
</script>

<div class="cwcms-sidebar">
	<div class="cwcms-sidebar-header">
		<div class="client-logo-container">
			<img src="/hermitage_logo_black.svg" alt="hermitage-logo" />
		</div>
		<button
			type="button"
			class="cwcms-sidebar-close"
			aria-label="Stäng navigation"
			onclick={onClose}
		>
			<i class="ph-bold ph-x"></i>
		</button>
	</div>
	<div class="cwcms-sidebar-content">
		<a
			href="/dashboard/lunch-menu"
			class="tab-button"
			class:active={isActive("/dashboard/lunch-menu")}
			onclick={onNavigate}
			><i class="ph-bold ph-fork-knife"></i>Buffémeny</a
		>
		<a
			href="/dashboard/menu"
			class="tab-button"
			class:active={isActive("/dashboard/menu")}
			onclick={onNavigate}
			><i class="ph-bold ph-files"></i>Á la carte meny</a
		>
		<a
			href="/dashboard/contact"
			class="tab-button"
			class:active={isActive("/dashboard/contact")}
			onclick={onNavigate}
			><i class="ph-bold ph-envelope"></i>Kontaktformulär</a
		>
		<a
			href="/dashboard/reviews"
			class="tab-button"
			class:active={isActive("/dashboard/reviews")}
			onclick={onNavigate}
			><i class="ph-bold ph-user-circle-gear"></i>Omdömen</a
		>
		<a
			href="/dashboard/images"
			class="tab-button"
			class:active={isActive("/dashboard/images")}
			onclick={onNavigate}
			><i class="ph-bold ph-image"></i>Bilder</a
		>
		<!-- <a href="/dashboard/menu" class="tab-button"
			><i class="ph-bold ph-clock"></i>Öppettider</a
		> -->
	</div>
	<div class="cwcms-sidebar-footer">
		<button type="button" class="tab-button" onclick={handleLogout}>
			<i class="ph-bold ph"></i>Logga ut
		</button>
	</div>
</div>
