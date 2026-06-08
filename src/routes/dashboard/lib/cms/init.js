import 'dotenv/config'
import mongoose from 'mongoose'
import menuCategory from '$cmslib/cms/menuCategory.js'
import buffetMenu from '$cmslib/cms/buffetMenu.js'
import review from '$cmslib/cms/review.js'
import siteImages from '$cmslib/cms/siteImages.js'
import publishedPage from '$cmslib/cms/publishedPage.js'
import contactSubmission from '$cmslib/cms/contactSubmission.js'

//cache across serverless invocations, using same warm lambda containers
const g = globalThis
g.__mongoose ??= { conn: null, promise: null }

export async function initCMS() {
    if (g.__mongoose.conn) return g.__mongoose.conn

    if (!g.__mongoose.promise) {
        g.__mongoose.promise = mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        })
    }

    g.__mongoose.conn = await g.__mongoose.promise

    //register models once
    if (!mongoose.models[menuCategory.modelName]) {
        mongoose.model(menuCategory.modelName, menuCategory.schema)
    }
    if (!mongoose.models[buffetMenu.modelName]) {
        mongoose.model(buffetMenu.modelName, buffetMenu.schema)
    }
    if (!mongoose.models[review.modelName]) {
        mongoose.model(review.modelName, review.schema)
    }
    if (!mongoose.models[siteImages.modelName]) {
        mongoose.model(siteImages.modelName, siteImages.schema)
    }
    if (!mongoose.models[publishedPage.modelName]) {
        mongoose.model(publishedPage.modelName, publishedPage.schema)
    }
    if (!mongoose.models[contactSubmission.modelName]) {
        mongoose.model(contactSubmission.modelName, contactSubmission.schema)
    }

    return g.__mongoose.conn
}
