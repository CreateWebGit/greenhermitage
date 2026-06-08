import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

//get menu categories
export async function GET() {
    await initCMS()
    const Review = mongoose.model('Review')

    const reviews = await Review.find().lean()

    return json(reviews)
}

// Create a new public review
export async function POST({ request }) {
    await initCMS()
    const Review = mongoose.model('Review')

    const data = await request.json()

    const name = typeof data.name === 'string' ? data.name.trim() : ''
    const text = typeof data.text === 'string' ? data.text.trim() : ''
    const rating = Number(data.rating)

    if (!name || !text || !Number.isFinite(rating)) {
        return json({ success: false, message: 'Missing name, text, or rating' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
        return json({ success: false, message: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const newReview = await Review.create({ name, text, rating })

    return json({ success: true, review: newReview }, { status: 201 })
}
