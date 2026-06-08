export async function load({ fetch }) {
    let res = await fetch('/api/menu')
    if (!res.ok) {
        throw new Error('Failed to fetch menu')
    }
    const categories = await res.json()

    res = await fetch('/api/reviews')
    if (!res.ok) {
        throw new Error('Failed to fetch reviews')
    }
    const reviews = await res.json()

    res = await fetch('/api/images')
    if (!res.ok) {
        throw new Error('Failed to images')
    }
    const images = await res.json()

    res = await fetch('/api/published')
    if (!res.ok) {
        throw new Error('Failed to fetch published status of pages')
    }
    const published = await res.json()

    return { categories, reviews, images, published }
}