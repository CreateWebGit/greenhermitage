import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

// Get all reviews
export async function GET() {
    await initCMS()
    const Review = mongoose.model('Review')
    const reviews = await Review.find().sort({ createdAt: -1 })
    return json(reviews)
}

// Create a new review
export async function POST({ request }) {
    await initCMS()
    const Review = mongoose.model('Review')
    const data = await request.json()

    if (!data.name || !data.text || typeof data.rating !== 'number') {
        return json({ success: false, message: 'Missing name, text, or rating' }, { status: 400 })
    }

    const newReview = await Review.create({
        name: data.name,
        text: data.text,
        rating: data.rating
    })

    return json({ success: true, review: newReview }, { status: 201 })
}
