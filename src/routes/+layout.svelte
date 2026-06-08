<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { menuPublished } from "$lib/stores/publishedStore";

    let { data, children } = $props()

    if (browser) {
        onMount(() => {
            $menuPublished = data.published
        })
    }
</script>

{@render children()}
