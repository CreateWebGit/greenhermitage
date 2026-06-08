<script>
    let modalTitle = $state('Modal Title')

    let { onConfirm, onCancel } = $props();
</script>

<div class="cwcms-modal">
    <div class="cwcms-modal-header">
        {modalTitle}
        <i class="ph-bold ph-x"></i>
    </div>
    <div class="cwcms-modal-content">
        asdasd
        asdasd
    </div>
    <div class="cwcms-modal-footer">
        <button class="secondary small">Avbryt</button>
        <button onclick={() => onConfirm()} class="primary small">Skapa</button>
    </div>
</div>