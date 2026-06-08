import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'

export async function PATCH({ params }) {
    const { id } = params

    try {
        const Review = mongoose.model('Review')
        const review = await Review.findById(id)

        if (!review) {
            return json({ success: false, message: 'Review not found' }, { status: 404 })
        }

        review.highlight = !review.highlight
        await review.save()

        return json({ success: true, highlight: review.highlight })
    } catch (err) {
        console.error(err)
        return json({ success: false, message: 'Server error' }, { status: 500 })
    }
}
