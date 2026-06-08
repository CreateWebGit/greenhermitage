<script>
    import Sidebar from "./components/Sidebar.svelte";
    import Toast from "./components/Toast.svelte";
    import './css/main.scss';
    import { onMount } from "svelte";
    import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action'

    overrideItemIdKeyNameBeforeInitialisingDndZones('_id')

    onMount(() => {
        document.body.classList.add('cwcms-body')
    })
</script>

<div class="cwcms-layout">
    <Sidebar/>
    <div class="cwcms-right-container">
        <slot/>
    </div>
</div>

<Toast/>