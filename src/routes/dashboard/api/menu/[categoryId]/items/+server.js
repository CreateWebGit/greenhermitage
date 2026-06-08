//handle items in categories


import { json } from '@sveltejs/kit'
import { initCMS } from '$cmslib/cms/init'
import mongoose from 'mongoose'

//add item to specific category
export async function PUT({ params, request }) {
    await initCMS()
    const Category = mongoose.model('MenuCategory')
    const { categoryId } = params
    const data = await request.json()

    if (!data.title || typeof data.price !== 'number') {
        return json({ success: false, message: 'Missing or invalid title or price' }, { status: 400 })
    }

    const result = await Category.findByIdAndUpdate(
        categoryId,
        { $push: { dishes: data } },
        { new: true }
    )

    if (!result) {
        return json({ success: false, message: 'Category not found' }, { status: 404 })
    }

    return json({ success: true, category: result })
}