<script>
    import Sidebar from "./components/Sidebar.svelte";
    import Toast from "./components/Toast.svelte";
    import './css/main.scss';
    import { onMount } from "svelte";
    import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action'

    overrideItemIdKeyNameBeforeInitialisingDndZones('_id')

    let sidebarOpen = $state(false)

    onMount(() => {
        document.body.classList.add('cwcms-body')

        return () => {
            document.body.classList.remove('cwcms-body')
        }
    })

    const closeSidebar = () => {
        sidebarOpen = false
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/bold/style.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/fill/style.css"/>
</svelte:head>

<svelte:window
    onkeydown={(event) => {
        if (event.key === 'Escape') closeSidebar()
    }}
/>

<div class="cwcms-layout">
    <button
        type="button"
        class="cwcms-mobile-menu-button"
        aria-label="Öppna navigation"
        aria-expanded={sidebarOpen}
        onclick={() => sidebarOpen = true}
    >
        <i class="ph-bold ph-list"></i>
    </button>

    <div class:open={sidebarOpen} class="cwcms-sidebar-drawer">
        <Sidebar onNavigate={closeSidebar} onClose={closeSidebar}/>
    </div>

    {#if sidebarOpen}
        <button
            type="button"
            class="cwcms-sidebar-backdrop"
            aria-label="Stäng navigation"
            onclick={closeSidebar}
        ></button>
    {/if}
    <div class="cwcms-right-container">
        <slot/>
    </div>
</div>

<Toast/>