import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'

export async function DELETE({ params }) {
    const { categoryId } = params

    try {
        const Category = mongoose.model('MenuCategory')
        const result = await Category.findByIdAndDelete(categoryId)

        if (!result) {
            return json({ success: false, message: 'Category not found' }, { status: 404 })
        }

        return json({ success: true })
    } catch (err) {
        console.error(err)
        return json({ success: false, message: 'Server error' }, { status: 500 })
    }
}