import mongoose from 'mongoose'

const PublishedPageSchema = new mongoose.Schema(
    {
        page: { type: String, required: true, unique: true },
        published: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

export default {
    modelName: 'PublishedPage',
    schema: PublishedPageSchema
}

