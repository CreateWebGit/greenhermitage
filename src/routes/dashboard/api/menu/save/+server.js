import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init'
import { sanitizeCategoriesForSave } from '$lib/server/menuLocalization'

export async function POST({ request }) {
    await initCMS()
    const data = await request.json()
    const Category = mongoose.model('MenuCategory')

    if (!Array.isArray(data)) {
        return json({ success: false, message: 'Invalid payload' }, { status: 400 })
    }

    const cleanedData = sanitizeCategoriesForSave(data)

    await Category.deleteMany({})
    const res = await Category.insertMany(cleanedData)

    return json({ success: true, saved: res.length })
}
