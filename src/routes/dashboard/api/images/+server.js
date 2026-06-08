import { json } from '@sveltejs/kit'
import mongoose from 'mongoose'
import { initCMS } from '$cmslib/cms/init.js'
import { UTApi } from 'uploadthing/server'

// Fetch or initialize the single SiteImages doc
export async function GET() {
  await initCMS()
  const SiteImages = mongoose.model('SiteImages')
  let doc = await SiteImages.findOne()
  if (!doc) {
    doc = await SiteImages.create({ slider: [], lunch: '' })
  }
  return json({ slider: doc.slider ?? [], lunch: doc.lunch ?? '' })
}

// Save slider image URLs and/or lunch hero image
export async function PUT({ request }) {
  await initCMS()
  const SiteImages = mongoose.model('SiteImages')
  const data = await request.json().catch(() => ({}))

  let doc = await SiteImages.findOne()
  if (!doc) doc = new SiteImages({ slider: [], lunch: '' })

  if (Array.isArray(data.slider)) {
    // Keep at most 4 images for slider
    doc.slider = data.slider.filter((s) => typeof s === 'string').slice(0, 4)
  }
  if (typeof data.lunch === 'string') {
    doc.lunch = data.lunch
  }

  await doc.save()
  return json({ success: true, slider: doc.slider, lunch: doc.lunch })
}

// Delete an image from UploadThing and update DB
export async function DELETE({ request }) {
  await initCMS()
  const SiteImages = mongoose.model('SiteImages')
  const body = await request.json().catch(() => ({}))
  const kind = body.kind // 'slider' | 'lunch'
  const key = body.key || extractKeyFromUrl(body.url)
  if (!kind || !key) {
    return json({ success: false, message: 'Missing kind or key/url' }, { status: 400 })
  }

  // Delete from UploadThing storage (best-effort)
  try {
    const ut = new UTApi()
    await ut.deleteFiles(key)
  } catch (e) {
    console.warn('UploadThing delete failed (continuing):', e?.message || e)
  }

  // Update our DB document
  let doc = await SiteImages.findOne()
  if (!doc) doc = new SiteImages({ slider: [], lunch: '' })
  if (kind === 'slider') {
    // If url provided, remove by url; otherwise just ensure array is <=4
    if (body.url) {
      doc.slider = (doc.slider || []).filter((u) => u !== body.url)
    } else {
      // no url to match, leave as-is
    }
  } else if (kind === 'lunch') {
    if (body.url && doc.lunch === body.url) doc.lunch = ''
  }
  await doc.save()
  return json({ success: true, slider: doc.slider, lunch: doc.lunch })
}

function extractKeyFromUrl(url) {
  if (typeof url !== 'string') return undefined
  try {
    const u = new URL(url)
    // common patterns: /f/<key> or /u/<key>
    const parts = u.pathname.split('/')
    const idx = parts.findIndex((p) => p === 'f' || p === 'u')
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
    // fallback: last segment
    return parts.filter(Boolean).pop()
  } catch {
    return undefined
  }
}
