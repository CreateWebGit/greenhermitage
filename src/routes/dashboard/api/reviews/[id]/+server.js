import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

// Reply to a review
export async function PATCH({ params, request }) {
    await initCMS()
    const Review = mongoose.model('Review')
    const { id } = params
    const { replyText } = await request.json()

    if (!replyText) {
        return json({ success: false, message: 'Reply text is required' }, { status: 400 })
    }

    const review = await Review.findByIdAndUpdate(
        id,
        {
            reply: {
                text: replyText,
                repliedAt: new Date()
            }
        },
        { new: true }
    )

    if (!review) {
        return json({ success: false, message: 'Review not found' }, { status: 404 })
    }

    return json({ success: true, review })
}
