import mongoose from 'mongoose'

const LocalizedStringSchema = new mongoose.Schema({
    sv: { type: String, default: '' },
    en: { type: String, default: '' }
}, { _id: false })

const ImageSchema = new mongoose.Schema({
    id: { type: String, default: '' },
    url: { type: String, default: '' }
}, { _id: false })

const BuffetItemSchema = new mongoose.Schema({
    title: { type: LocalizedStringSchema, default: () => ({ sv: '', en: '' }) },
    description: { type: LocalizedStringSchema, default: () => ({ sv: '', en: '' }) }
})

const BuffetSectionSchema = new mongoose.Schema({
    price: { type: Number, default: null },
    items: { type: [BuffetItemSchema], default: () => [] },
    images: { type: [ImageSchema], default: () => [] },
    openingHours: {
        weekday: {
            from: { type: String, default: '' },
            to: { type: String, default: '' }
        },
        weekend: {
            from: { type: String, default: '' },
            to: { type: String, default: '' }
        }
    }
}, { _id: false })

const BuffetMenuSchema = new mongoose.Schema({
    sameMenu: { type: Boolean, default: true },
    lunch: { type: BuffetSectionSchema, default: () => ({}) },
    dinner: { type: BuffetSectionSchema, default: () => ({}) }
})

export default {
    modelName: 'BuffetMenu',
    schema: BuffetMenuSchema
}
