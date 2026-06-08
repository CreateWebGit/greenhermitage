<script>
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { authClient } from "$lib/auth-client";

	const isActive = (href) => $page.url.pathname.startsWith(href);

	const handleLogout = async () => {
		await authClient.signOut();
		await goto("/admin");
	};
</script>

<div class="cwcms-sidebar">
	<div class="cwcms-sidebar-header">
		<div class="client-logo-container">
			<img src="/hermitage_logo_black.svg" alt="hermitage-logo" />
		</div>
	</div>
	<div class="cwcms-sidebar-content">
		<a
			href="/dashboard/menu"
			class="tab-button"
			class:active={isActive("/dashboard/menu")}
			><i class="ph-bold ph-files"></i>Á la carte meny</a
		>
		<a
			href="/dashboard/lunch-menu"
			class="tab-button"
			class:active={isActive("/dashboard/lunch-menu")}
			><i class="ph-bold ph-fork-knife"></i>Buffémeny</a
		>
		<a
			href="/dashboard/contact"
			class="tab-button"
			class:active={isActive("/dashboard/contact")}
			><i class="ph-bold ph-envelope"></i>Kontaktformulär</a
		>
		<a
			href="/dashboard/reviews"
			class="tab-button"
			class:active={isActive("/dashboard/reviews")}
			><i class="ph-bold ph-user-circle-gear"></i>Omdömen</a
		>
		<a
			href="/dashboard/images"
			class="tab-button"
			class:active={isActive("/dashboard/images")}
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
