<script>
    let modalTitle = $state('Svara på omdöme')

    let { onConfirm, onCancel } = $props();

    let reviewAnswer = $state('')

    function confirmHandler() {
        onConfirm(something)
    }
</script>

<div class="cwcms-modal">
    <div class="cwcms-modal-header">
        {modalTitle}
        <i class="ph-bold ph-x"></i>
    </div>
    <div class="cwcms-modal-content">
        <div class="input-container">
            <textarea bind:value={reviewAnswer} placeholder="t.ex. Vad kul att höra! /Hermitage" rows="4"></textarea>
        </div>
    </div>
    <div class="cwcms-modal-footer">
        <button onclick={onCancel} class="secondary small">Avbryt</button>
        <button onclick={() => onConfirm(reviewAnswer)} class="primary small">Svara</button>
    </div>
</div>