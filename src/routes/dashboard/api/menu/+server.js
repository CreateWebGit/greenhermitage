//api endpoints for categories

import { json } from '@sveltejs/kit'
import { initCMS } from '$cmslib/cms/init'
import mongoose from 'mongoose'
import { normalizeCategory, toLocalized } from '$lib/server/menuLocalization'

//get all categories and their items from the db
export async function GET() {
    await initCMS()
    const Category = mongoose.model('MenuCategory')
    const categories = await Category.find().lean()
    return json(categories.map(normalizeCategory))
}

//create new category
export async function POST({ request }) {
    await initCMS()
    const Category = mongoose.model('MenuCategory')
    const data = await request.json()

    if (!data.title) {
        return json({ success: false, message: 'Missing title' }, { status: 400 })
    }

    const newCategory = new Category({
        title: toLocalized(data.title),
        dishes: []
    })
    await newCategory.save()

    return json({ success: true, category: normalizeCategory(newCategory.toObject()) }, { status: 201 })
}
