<script>
    let { onConfirm, onCancel, modalTitle = 'Lägg till maträtt', showPrice = true } = $props();

    let itemTitle = $state({ sv: '', en: '' })
    let itemDescription = $state({ sv: '', en: '' })
    let itemPrice = $state('')

    const normalizeLocalized = (value = {}) => {
        const sv = typeof value.sv === 'string' ? value.sv.trim() : ''
        const en = typeof value.en === 'string' ? value.en.trim() : ''
        return {
            sv: sv || en,
            en
        }
    }

    function handleConfirm() {
        const title = normalizeLocalized(itemTitle)
        const description = normalizeLocalized(itemDescription)
        const parsedPrice = showPrice ? parseFloat(itemPrice) : NaN
        const price = showPrice && Number.isFinite(parsedPrice) ? parsedPrice : null

        onConfirm({ title, description, price })
    }
</script>

<div class="cwcms-modal">
    <div class="cwcms-modal-header">
        {modalTitle}
        <i class="ph-bold ph-x"></i>
    </div>
    <div class="cwcms-modal-content">
        <!-- <input bind:value={itemTitle} placeholder="Title" />
        <textarea bind:value={itemDescription} placeholder="Description"></textarea>
        <input bind:value={itemPrice} placeholder="Price" /> -->
        <div class="input-container">
            <div class="input-label">Titel (SV)</div>
            <input bind:value={itemTitle.sv} type="text" placeholder="t.ex. Krispig tofu i jordnötssås">
        </div>
        <div class="input-container">
            <div class="input-label">Title (EN)</div>
            <input bind:value={itemTitle.en} type="text" placeholder="e.g. Crispy tofu in peanut sauce">
        </div>
        <div class="input-container">
            <div class="input-label">Beskrivning (SV)</div>
            <textarea bind:value={itemDescription.sv} placeholder="t.ex. Krispig tofu serveras med en krämig jordnötssås och fluffigt ris" rows="3"></textarea>
        </div>
        <div class="input-container">
            <div class="input-label">Description (EN)</div>
            <textarea bind:value={itemDescription.en} placeholder="e.g. Crispy tofu served with creamy peanut sauce and fluffy rice" rows="3"></textarea>
        </div>

        {#if showPrice}
            <div class="input-container">
                <div class="input-label">Pris</div>
                <input bind:value={itemPrice} type="text" placeholder="t.ex. 189">
            </div>
        {/if}
    </div>
    <div class="cwcms-modal-footer">
        <button onclick={onCancel} class="secondary small">Avbryt</button>
        <button onclick={handleConfirm} class="primary small">Skapa</button>
    </div>
</div>
