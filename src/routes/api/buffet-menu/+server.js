import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'
import { toLocalized } from '$lib/server/menuLocalization'

const normalizeItem = (item = {}) => ({
    ...item,
    title: toLocalized(item.title),
    description: toLocalized(item.description)
})

const normalizeImage = (image) => {
    if (!image) return null
    if (typeof image === 'string') return { id: image, url: image }
    const url = image.url || image.fileUrl || image.src
    if (!url) return null
    const id = image.id || image._id || image.key || url
    return { id, url }
}

const normalizeSection = (section = {}) => {
    const priceValue = typeof section.price === 'number' ? section.price : parseFloat(section.price)
    const openingHours = section.openingHours || {}
    const weekday = openingHours.weekday || {}
    const weekend = openingHours.weekend || {}

    return {
        price: Number.isFinite(priceValue) ? priceValue : null,
        items: Array.isArray(section.items) ? section.items.map(normalizeItem) : [],
        images: Array.isArray(section.images)
            ? section.images.map(normalizeImage).filter(Boolean)
            : [],
        openingHours: {
            weekday: {
                from: typeof weekday.from === 'string' ? weekday.from : '',
                to: typeof weekday.to === 'string' ? weekday.to : ''
            },
            weekend: {
                from: typeof weekend.from === 'string' ? weekend.from : '',
                to: typeof weekend.to === 'string' ? weekend.to : ''
            }
        }
    }
}

const normalizeMenu = (menu = {}) => ({
    sameMenu: !!menu.sameMenu,
    lunch: normalizeSection(menu.lunch),
    dinner: normalizeSection(menu.dinner)
})

// public buffet menu
export async function GET() {
    await initCMS()
    const BuffetMenu = mongoose.model('BuffetMenu')
    const doc = await BuffetMenu.findOne().lean()

    if (!doc) {
        return json({
            sameMenu: true,
            lunch: {
                price: null,
                items: [],
                images: [],
                openingHours: { weekday: { from: '', to: '' }, weekend: { from: '', to: '' } }
            },
            dinner: {
                price: null,
                items: [],
                images: [],
                openingHours: { weekday: { from: '', to: '' }, weekend: { from: '', to: '' } }
            }
        })
    }

    return json(normalizeMenu(doc))
}
