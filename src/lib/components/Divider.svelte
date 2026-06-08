<script>
    let { marginTop = 2, marginBottom = 2 } = $props();
</script>

<div class="divider-container">
    <img class="mt-{marginTop} mb-{marginBottom}" src="/icons/divider.svg" alt="divider icon"/>
</div>

<style>
    .divider-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            pointer-events: none;
            width: 4.875rem;
            user-select: none;
        }
    }
</style>