import { redirect } from '@sveltejs/kit'

const changePasswordPath = '/dashboard/change-password'

export const load = async ({ locals, url }) => {
    if (!locals.user) {
        const redirectTo = encodeURIComponent(url.pathname + url.search)
        throw redirect(302, `/login?redirect=${redirectTo}`)
    }

    if (locals.user.forcePasswordChange && url.pathname !== changePasswordPath) {
        throw redirect(302, changePasswordPath)
    }
}
