import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

// Get published state for a page
export async function GET({ params }) {
    await initCMS()
    const { page } = params
    const PublishedPage = mongoose.model('PublishedPage')

    const doc = await PublishedPage.findOne({ page }).lean()
    return json({ page, published: doc?.published ?? false })
}

// Set published state for a page
export async function PATCH({ params, request }) {
    await initCMS()
    const { page } = params
    const PublishedPage = mongoose.model('PublishedPage')

    const body = await request.json().catch(() => ({}))
    if (typeof body.published !== 'boolean') {
        return json({ success: false, message: 'published must be boolean' }, { status: 400 })
    }

    const updated = await PublishedPage.findOneAndUpdate(
        { page },
        { $set: { published: body.published } },
        { new: true, upsert: true }
    ).lean()

    return json({ success: true, page: updated.page, published: updated.published })
}

