<script>
    import { onMount } from 'svelte'
    import { generateSvelteHelpers } from '@uploadthing/svelte'
    import UploadButton from '../components/UploadButton.svelte';

    let isDirty = $state(false)
    let isLoading = $state(true)
    let mounted = $state(false)
    let sliderImages = $state([]) // array of image URLs

    async function loadImages() {
        try {
            const res = await fetch('/dashboard/api/images')
            if (res.ok) {
                const data = await res.json()
                sliderImages = Array.isArray(data.slider) ? data.slider : []
            }
        } catch (e) {
            console.error('Failed loading images', e)
        } finally {
            isLoading = false
        }
    }

    onMount(() => {
        mounted = true
        loadImages()
    })

    const { uploadFiles } = generateSvelteHelpers()

    async function handleFileInputChange(event) {
        const files = Array.from(event.target.files || [])
        if (files.length === 0) return
        try {
            const res = await uploadFiles('sliderUploader', { files })
            const urls = (res ?? []).map((f) => f.url).filter(Boolean)
            sliderImages = [...sliderImages, ...urls].slice(0, 4)
            isDirty = true
        } catch (e) {
            console.error('Upload failed', e)
            alert('Uppladdning misslyckades')
        } finally {
            // reset input so same file can be chosen again
            event.target.value = ''
        }
    }

    async function saveChanges() {
        try {
            await fetch('/dashboard/api/images', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slider: sliderImages })
            })
            isDirty = false
        } catch (e) {
            console.error('Failed saving images', e)
        }
    }

    async function removeImage(index) {
        const url = sliderImages[index]
        if (!url) return
        try {
            const res = await fetch('/dashboard/api/images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kind: 'slider', url })
            })
            if (res.ok) {
                const data = await res.json()
                sliderImages = Array.isArray(data.slider) ? data.slider : []
                isDirty = false
            } else {
                console.error('Delete failed', await res.text())
                alert('Kunde inte ta bort bilden')
            }
        } catch (e) {
            console.error('Delete error', e)
            alert('Kunde inte ta bort bilden')
        }
    }
</script>

<div class="cwcms-header">
    <div class="cwcms-header-module-title">
        Bilder
    </div>
    <div class="cwcms-header-module-published"></div>
    <div class="cwcms-header-button-container">
        <div class="line"></div>
        <div class="save-buttons">
            {#if isDirty}
                <!-- <button transition:fly={{y: 5}} class="secondary">Avbryt</button> -->
            {/if}
            <button onclick={saveChanges} class="primary">Spara</button>
        </div>
    </div>
</div>
<div class="cwcms-main images">
    {#if isLoading}
        <div>Laddar...</div>
    {:else}
        <div class="input-container">
            <div class="input-label">Startsida bildslider (max 4 bilder)</div>
            <div class="images-grid" style="display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; margin-bottom: 12px;">
                {#each Array(4) as _, i}
                    <div class="slot" style="border:1px dashed #ccc; border-radius:8px; aspect-ratio: 16/9; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#f9f9f9;">
                        {#if sliderImages[i]}
                            <img src={sliderImages[i]} alt={`slider ${i+1}`} style="width:100%; height:100%; object-fit:cover;" />
                            <button onclick={() => removeImage(i)} class="secondary" aria-label="remove image" style="position:absolute; top:6px; right:6px;">Ta bort</button>
                        {:else}
                            <span style="color:#888; font-size:0.9rem;">Tom</span>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- <input type="file" accept="image/*" multiple onchange={handleFileInputChange} /> -->
            <UploadButton uploadImage={handleFileInputChange}></UploadButton>
            <div class="input-description">Ladda upp upp till 4 bilder. Nya bilder fyller tomma rutor i ordning.</div>
        </div>
    {/if}
</div>
