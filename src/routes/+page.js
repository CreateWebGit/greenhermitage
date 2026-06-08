export async function load({ fetch }) {
    let res = await fetch('/api/reviews')
    if (!res.ok) {
        throw new Error('Failed to fetch menu')
    }
    const reviews = await res.json()

    res = await fetch('/api/images')
    if (!res.ok) {
        throw new Error('Failed to fetch menu')
    }
    const images = await res.json()

    return { reviews, images }
}