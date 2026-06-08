import { auth } from '$lib/server/auth'
import { svelteKitHandler } from 'better-auth/svelte-kit'
import { building } from '$app/environment'

export const handle = async ({ event, resolve }) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    })

    event.locals.user = session?.user ?? null
    event.locals.session = session?.session ?? null

    return svelteKitHandler({ event, resolve, auth, building })
}
