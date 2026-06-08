export async function load({ fetch }) {
    const res = await fetch('/api/buffet-menu')
    if (!res.ok) {
        throw new Error('Failed to fetch buffet menu')
    }
    const buffetMenu = await res.json()

    return { buffetMenu }
}
