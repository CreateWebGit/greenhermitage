export const toLocalized = (value) => {
    if (value && typeof value === 'object') {
        return {
            sv: typeof value.sv === 'string' ? value.sv : '',
            en: typeof value.en === 'string' ? value.en : ''
        }
    }

    const str = typeof value === 'string' ? value : ''
    return { sv: str, en: '' }
}

export const normalizeDish = (dish = {}) => {
    const priceValue = typeof dish.price === 'number' ? dish.price : parseFloat(dish.price)

    return {
        ...dish,
        title: toLocalized(dish.title),
        description: toLocalized(dish.description),
        price: Number.isFinite(priceValue) ? priceValue : null
    }
}

export const normalizeCategory = (category = {}) => ({
    ...category,
    title: toLocalized(category.title),
    dishes: Array.isArray(category.dishes) ? category.dishes.map(normalizeDish) : []
})

export const sanitizeCategoriesForSave = (categories = []) => categories.map(({ _id, ...category }) => {
    const sanitizedDishes = Array.isArray(category.dishes)
        ? category.dishes.map(({ _id, ...dish }) => {
            const priceValue = typeof dish.price === 'number' ? dish.price : parseFloat(dish.price)

            return {
                ...dish,
                title: toLocalized(dish.title),
                description: toLocalized(dish.description),
                price: Number.isFinite(priceValue) ? priceValue : null
            }
        })
        : []

    return {
        ...category,
        title: toLocalized(category.title),
        dishes: sanitizedDishes
    }
})
