import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

export async function POST({ request }) {
    await initCMS()
    const ContactSubmission = mongoose.model('ContactSubmission')

    const payload = await request.json()

    const name = typeof payload.name === 'string' ? payload.name.trim() : ''
    const email = typeof payload.email === 'string' ? payload.email.trim() : ''
    const phone = typeof payload.phone === 'string' ? payload.phone.trim() : ''
    const message = typeof payload.message === 'string' ? payload.message.trim() : ''

    if (!name || !email || !message) {
        return json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    const submission = await ContactSubmission.create({
        name,
        email,
        phone,
        message
    })

    const submissionPayload = submission.toObject()
    delete submissionPayload.__v

    return json({ success: true, submission: submissionPayload }, { status: 201 })
}
