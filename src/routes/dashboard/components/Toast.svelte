<script>
    import { toasts } from '../stores/layoutStore';
    import { cubicOut } from 'svelte/easing';

    function fadeFly(node, { y = 10, duration = 300 }) {
        return {
            duration,
            easing: cubicOut,
            css: t => `
                transform: translateY(${(1 - t) * y}px);
                opacity: ${t};
            `
        };
    }
</script>

<style>
.toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    z-index: 9999;
}

.toast {
    background: white;
    color: black;
    padding: 0 16px;
    height: 32px;
    font-size: 14px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    display: grid;
    place-items: center;
    border-radius: 4px;
    width: fit-content;
    text-align: right;

    &.success {
        background-color: rgba(103, 148, 89, 0.2);
        border: 1px solid #679459;
        color: black;
    }

    &.error {
        background-color: rgba(180, 67, 63, 0.2);
        border: 1px solid #b4433f;
        color: black;
    }
}
</style>

<div class="toast-container">
    {#each $toasts as toast (toast.id)}
        <div class="toast {toast.type}" transition:fadeFly={{ y: 10, duration: 250 }}>
            {toast.message}
        </div>
    {/each}
</div>
