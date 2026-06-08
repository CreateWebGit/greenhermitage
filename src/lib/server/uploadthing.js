import { createUploadthing } from 'uploadthing/server'

// Define upload endpoints for slider (max 4) and lunch (max 1)
const f = createUploadthing()

export const fileRouter = {
  sliderUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 4 } })
    .onUploadComplete(async ({ file }) => {
      console.log('Slider image uploaded:', file.url)
    }),
  lunchUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log('Lunch image uploaded:', file.url)
    })
}