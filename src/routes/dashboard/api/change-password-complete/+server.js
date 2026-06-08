import { json } from '@sveltejs/kit'
import { auth } from '$lib/server/auth'

export const POST = async ({ locals }) => {
    if (!locals.user) {
        return json({ message: 'Not authenticated.' }, { status: 401 })
    }

    const ctx = await auth.$context
    await ctx.internalAdapter.updateUser(locals.user.id, {
        forcePasswordChange: false
    })

    return json({ success: true })
}
