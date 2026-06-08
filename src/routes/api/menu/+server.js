import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'
import { normalizeCategory } from '$lib/server/menuLocalization'

//get menu categories
export async function GET({ url }) {
    await initCMS()
    const Category = mongoose.model('MenuCategory')

    const categories = await Category.find().lean()
    const normalized = categories.map(normalizeCategory)

    const lang = url.searchParams.get('lang')
    if (lang && ['sv', 'en'].includes(lang)) {
        return json(
            normalized.map(({ title, dishes, ...rest }) => ({
                ...rest,
                title: title[lang] ?? '',
                dishes: dishes.map(({ title: dishTitle, description, ...dishRest }) => ({
                    ...dishRest,
                    title: dishTitle[lang] ?? '',
                    description: description[lang] ?? ''
                }))
            }))
        )
    }

    return json(normalized)
}
