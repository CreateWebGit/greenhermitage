//functions for menu module

const normalizeLocalized = (value) => {
    if (value && typeof value === 'object') {
        return {
            sv: typeof value.sv === 'string' ? value.sv : '',
            en: typeof value.en === 'string' ? value.en : ''
        }
    }

    const str = typeof value === 'string' ? value : ''
    return { sv: str, en: '' }
}

//get all categories and their items
export async function getCategories() {
    const res = await fetch('/dashboard/api/menu')
    if (!res.ok) return []

    return await res.json()
}

//create new category
export async function createCategory(title) {
    const res = await fetch('/dashboard/api/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: normalizeLocalized(title) })
    })

    const data = await res.json()
    return data.success ? data.category : null
}

//delete entire category, and items in it
export async function deleteCategory(categoryId) {
    const res = await fetch(`/dashboard/api/menu/${categoryId}`, {
        method: 'DELETE'
    })

    const data = await res.json()
    return data
}

//add new item in category
export async function addItemToCategory(categoryId, item) {
    const res = await fetch(`/dashboard/api/menu/${categoryId}/items`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...item,
            title: normalizeLocalized(item.title),
            description: normalizeLocalized(item.description)
        })
    })

    const data = await res.json()
    return data.success ? data.category : null
}
