export async function getPublished(page) {
    const res = await fetch(`/dashboard/api/published-pages/${page}`)
    if (!res.ok) return { page, published: false }
    return await res.json()
}

export async function setPublished(page, published) {
    const res = await fetch(`/dashboard/api/published-pages/${page}` , {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published })
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Kunde inte uppdatera publiceringsstatus.')
    }
    return await res.json()
}

