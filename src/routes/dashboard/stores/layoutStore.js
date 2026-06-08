import { writable } from "svelte/store";

export let showCreateItemModal = writable(false)
export let showAnswerReviewModal = writable(false)
export let showCreateCategoryModal = writable(false)

let idCounter = 0;
export const toasts = writable([]);

export function toast(message, duration = 3000, type = 'normal') {
    const id = idCounter++;

    toasts.update((all) => [...all, { id, message, duration, type }]);

    setTimeout(() => {
        toasts.update((all) => all.filter((t) => t.id !== id));
    }, duration);
}