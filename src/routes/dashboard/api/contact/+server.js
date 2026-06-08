import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init'

export async function GET() {
    await initCMS()
    const ContactSubmission = mongoose.model('ContactSubmission')

    const submissions = await ContactSubmission.find()
        .sort({ createdAt: -1 })
        .lean()

    const sanitized = submissions.map(({ __v, ...rest }) => rest)

    return json(sanitized)
}
