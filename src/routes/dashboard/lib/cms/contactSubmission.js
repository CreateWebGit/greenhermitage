import mongoose from 'mongoose'

const ContactSubmissionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        message: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
)

export default {
    modelName: 'ContactSubmission',
    schema: ContactSubmissionSchema
}
