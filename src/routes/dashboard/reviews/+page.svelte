<script>
    import { onMount } from "svelte";
    import { getReviews } from "$cmslib/reviewsClientFunctions";
    import DebugObject from "../components/DebugObject.svelte";
    import StarRating from "../components/StarRating.svelte";
    import { showAnswerReviewModal, toast } from "../stores/layoutStore";
    import ModalAnswerReview from "../components/modals/ModalAnswerReview.svelte";
    import { fly } from "svelte/transition";

    let reviews = $state([])
    let isDirty = $state(false)
    let modalResolver;

    const formatDateToDDMMYY = (isoString) => {
        const date = new Date(isoString);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = String(date.getUTCFullYear()).slice(-2);

        return `${day}/${month}/${year}`;
    }

    const replyToReview = async (reviewId) => {
        const replyData = await openReplyToReviewModal()
        if (!replyData) return

        reviews = reviews.map(r => {
            if (r._id === reviewId) {
                return {
                    ...r,
                    reply: {
                        text: replyData,
                        repliedAt: new Date().toISOString()
                    }
                }
            }
            return r
        })

        isDirty = true
    }

    const removeReply = (reviewId) => {
        reviews = reviews.map(r => {
            if (r._id === reviewId) {
                const { reply, ...rest } = r;
                return rest;
            }
            return r;
        });

        isDirty = true;
    };

    const openReplyToReviewModal = () => {
        $showAnswerReviewModal = true

        return new Promise((resolve) => {
            modalResolver = resolve
        })
    }

    const handleReplyToReviewModalConfirm = (data) => {
        modalResolver(data)
        $showAnswerReviewModal = false
    }

    const handleReplyToReviewModalCancel = () => {
        modalResolver(null)
        $showAnswerReviewModal = false
    }

    const saveChanges = async () => {
        const res = await fetch('/dashboard/api/reviews/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviews)
        })

        if (res.ok) {
            const saved = await res.json()
            toast('Ändringar sparades & publicerades.', 3000, 'success')
            isDirty = false

            reviews = await getReviews()
        } else {
            toast('Något gick fel med att spara ändringarna.', 3000, 'error')
        }
    }

    const cancelChanges = async () => {
        reviews = await getReviews();
        isDirty = false
    }

    const removeReview = (reviewId) => {
        reviews = reviews.filter(r => r._id !== reviewId);
        isDirty = true;
    }

    onMount(async () => {
        reviews = await getReviews()
    })
</script>

<div class="cwcms-header">
    <div class="cwcms-header-module-title">
        Omdömen
    </div>
    <div class="cwcms-header-button-container">
        <div class="save-buttons">
            {#if isDirty}
                <button transition:fly={{y: 5}} class="secondary" onclick={cancelChanges}>Avbryt</button>
            {/if}
            <button onclick={saveChanges} class="primary">Spara</button>
        </div>
    </div>
</div>
<div class="cwcms-main reviews">
    <div class="reviews-container">
        {#each reviews as review}
            <div class="review-card-container">
                <div class="review-card-header">
                    <div class="name-date">
                        <div class="name">{review.name}</div>
                        <div class="date"><i class="ph-bold ph-calendar" style="position: relative; top: 1px;"></i> {formatDateToDDMMYY(review.createdAt)}</div>
                    </div>
                    <div class="stars">
                        <StarRating rating={review.rating}/>
                    </div>
                </div>
                <div class="review-card-content {review.reply ? 'has-reply' : ''}">
                    <div class="review-text">
                        {review.text}
                    </div>
                    
                    {#if review.reply}
                        <div class="review-reply">
                            {review.reply.text}
                        </div>
                    {/if}
                </div>
                <div class="review-card-footer">
                    <div class="input-container checkbox">
                        <div class="input-label">
                            <input bind:checked={review.highlight} value={review.highlight} onchange={() => isDirty = true} type="checkbox"/>
                            Highlighta
                        </div>
                    </div>
                    <div class="button-container">
                        <button onclick={() => removeReview(review._id)} class="small secondary">Ta bort omdöme</button>
                        {#if review.reply} 
                            <button onclick={() => removeReply(review._id)} class="small primary">Ta bort svar</button>
                        {:else} 
                            <button onclick={() => replyToReview(review._id)} class="small primary">Svara</button>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

{#if $showAnswerReviewModal}
<ModalAnswerReview onConfirm={handleReplyToReviewModalConfirm} onCancel={handleReplyToReviewModalCancel}/>
{/if}