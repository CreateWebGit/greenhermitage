import 'dotenv/config'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { auth } from '../src/lib/server/auth.js'

const rl = readline.createInterface({ input, output })

async function askRequired(prompt) {
    const value = (await rl.question(prompt)).trim()
    if (!value) {
        console.error('Value is required.')
        process.exit(1)
    }
    return value
}

async function askHidden(prompt) {
    return (await rl.question(prompt, { hideEchoBack: true })).trim()
}

const email = (await askRequired('Email: ')).toLowerCase()
const nameInput = (await rl.question('Name (optional): ')).trim()
const password = await askHidden('Password: ')
const confirm = await askHidden('Confirm password: ')
const forcePasswordChangeAnswer = (await rl.question('Change password on first login? (y/N): ')).trim().toLowerCase()
const forcePasswordChange = ["y", "yes"].includes(forcePasswordChangeAnswer)

rl.close()

if (!password || password !== confirm) {
    console.error('Passwords do not match.')
    process.exit(1)
}

const name = nameInput || undefined

try {
    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
            forcePasswordChange
        }
    })
    console.log(`Created user: ${email}`)
    process.exit(0)
} catch (error) {
    const message = error?.message || ''
    if (!message.includes('USER_ALREADY_EXISTS')) {
        throw error
    }
}

const ctx = await auth.$context
const existing = await ctx.internalAdapter.findUserByEmail(email, { includeAccounts: true })

if (!existing?.user) {
    console.error('User exists but could not be loaded.')
    process.exit(1)
}

const hash = await ctx.password.hash(password)
const hasCredential = existing.accounts?.some((account) => account.providerId === 'credential')

if (hasCredential) {
    await ctx.internalAdapter.updatePassword(existing.user.id, hash)
} else {
    await ctx.internalAdapter.linkAccount({
        userId: existing.user.id,
        providerId: 'credential',
        accountId: existing.user.id,
        password: hash
    })
}

const userUpdates = { forcePasswordChange }

if (name) {
    userUpdates.name = name
}

await ctx.internalAdapter.updateUser(existing.user.id, userUpdates)

console.log(`Updated user: ${email}`)
