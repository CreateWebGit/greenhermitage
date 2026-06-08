import { createRouteHandler } from 'uploadthing/remix'
import { fileRouter } from '$src/lib/server/uploadthing.js'

const { action, loader } = createRouteHandler({ router: fileRouter })

export const GET = async ({ request }) => loader({ request })
export const POST = async ({ request }) => action({ request })
