//model for menu with categories
import mongoose from 'mongoose'

const LocalizedStringSchema = new mongoose.Schema({
    sv: { type: String, default: '' },
    en: { type: String, default: '' }
}, { _id: false })

const ItemSchema = new mongoose.Schema({
    title: { type: LocalizedStringSchema, default: () => ({ sv: '', en: '' }) },
    description: { type: LocalizedStringSchema, default: () => ({ sv: '', en: '' }) },
    price: Number
})

const CategorySchema = new mongoose.Schema({
    title: { type: LocalizedStringSchema, default: () => ({ sv: '', en: '' }) },
    dishes: { type: [ItemSchema], default: () => [] }
})

export default {
    modelName: 'MenuCategory',
    schema: CategorySchema
}
