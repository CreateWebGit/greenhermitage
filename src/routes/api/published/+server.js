import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

//get menu categories
export async function GET() {
    await initCMS()
    const PublishedPage = mongoose.model('PublishedPage')

    const published = await PublishedPage.find().lean()

    return json(published)
}