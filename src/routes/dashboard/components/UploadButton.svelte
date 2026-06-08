<script>
    let {
        uploadImage,
        isUploading = false,
        label = 'Ladda upp bild',
        loadingLabel = 'Laddar upp...'
    } = $props()
</script>

<label>
    <input
        type="file"
        accept="image/*"
        disabled={isUploading}
        onchange={(e) => uploadImage(e)}
    />
    <a class="button primary fit-width">
        {isUploading ? loadingLabel : label}
    </a>
</label>

<style lang="scss">
    label {
        display: block;
        width: fit-content;

        input[type=file] {
            display: none;
        }
    }
</style>
