<script lang="ts">
    export let rating: number; // e.g., 3.2

    const maxStars = 5;
    const fullStars = Math.round(rating); // No half stars
    const emptyStars = maxStars - fullStars;
</script>

<div class="stars" style="display: flex; gap: 4px; font-size: 14px;">
    {#each Array(fullStars) as _, i}
        <span style="color: #FFCC00">★</span>
    {/each}
    {#each Array(emptyStars) as _, i}
        <span style="color: #d3d3d3">★</span>
    {/each}
</div>