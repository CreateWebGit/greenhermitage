import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        text: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        reply: {
            text: String,
            repliedAt: Date
        },
        highlight: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export default {
    modelName: 'Review',
    schema: ReviewSchema
}
