export async function getReviews() {
    const res = await fetch('/dashboard/api/reviews')

    if (!res.ok) throw new Error('Kunde inte hämta reviews.')

    return await res.json()
}

export async function createReview({ name, text, rating }) {
    const res = await fetch('/dashboard/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text, rating })
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Kunde inte skicka review.')
    }

    return await res.json()
}

export async function replyToReview(id, replyText) {
    const res = await fetch(`/dashboard/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyText })
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Kunde inte svara på review.')
    }

    return await res.json()
}

export async function toggleHighlight(id) {
    const res = await fetch(`/dashboard/api/reviews/${id}/toggle`, {
        method: 'PATCH'
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Kunde inte toggla highlight.')
    }

    return await res.json()
}

export async function saveReviews(reviews) {
    const res = await fetch('/dashboard/api/reviews/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviews)
    })

    if (!res.ok) {
        throw new Error('Kunde inte spara omdömen')
    }

    const data = await res.json()
    return data
}