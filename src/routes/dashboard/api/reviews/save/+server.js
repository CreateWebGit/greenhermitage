import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

export async function POST({ request }) {
    await initCMS()
    const Review = mongoose.model('Review')
    const data = await request.json()

    // Rensa bort gamla
    await Review.deleteMany({})

    // Sanera inkommande data: ta bort eventuella _id-fält
    const cleaned = data.map(({ _id, ...review }) => {
        // hantera ev. reply-objektet också
        const cleanedReply = review.reply && {
            text: review.reply.text,
            repliedAt: new Date(review.reply.repliedAt)
        }

        return {
            ...review,
            reply: cleanedReply || undefined
        }
    })

    const inserted = await Review.insertMany(cleaned)

    return json({ success: true, saved: inserted.length })
}
