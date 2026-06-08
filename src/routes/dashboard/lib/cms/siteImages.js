import mongoose from 'mongoose'

const SiteImagesSchema = new mongoose.Schema(
  {
    slider: { type: [String], default: [] },
    lunch: { type: String, default: '' }
  },
  { timestamps: true }
)

export default {
  modelName: 'SiteImages',
  schema: SiteImagesSchema
}
