import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'

//get menu categories
export async function GET() {
    await initCMS()
    const SiteImages = mongoose.model('SiteImages')

    const images = await SiteImages.find().lean()

    return json(images)
}