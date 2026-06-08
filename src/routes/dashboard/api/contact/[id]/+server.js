import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init'

export async function DELETE({ params }) {
    await initCMS()
    const ContactSubmission = mongoose.model('ContactSubmission')

    const { id } = params

    try {
        const result = await ContactSubmission.findByIdAndDelete(id)
        if (!result) {
            return json({ success: false, message: 'Submission not found' }, { status: 404 })
        }

        return json({ success: true })
    } catch (error) {
        return json({ success: false, message: 'Invalid submission id' }, { status: 400 })
    }
}
