<script>
    let { onConfirm, onCancel, modalTitle = 'Modal Title', children } = $props();
</script>

<div class="cwcms-modal">
    <div class="cwcms-modal-header">
        {modalTitle}
        <i class="ph-bold ph-x"></i>
    </div>
    <div class="cwcms-modal-content">
        {#if children}
            {@render children()}
        {:else}
            <p>fallback content</p>
        {/if}
    </div>
    <div class="cwcms-modal-footer">
        <button class="secondary small">Avbryt</button>
        <button onclick={() => onConfirm()} class="primary small">Skapa</button>
    </div>
</div>