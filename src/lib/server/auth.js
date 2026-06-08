import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { MongoClient } from 'mongodb'

let env = {}
try {
    ;({ env } = await import('$env/dynamic/private'))
} catch {
    env = process.env
}

const uri = env.MONGO_URI ?? process.env.MONGO_URI

if (!uri) {
    throw new Error('MONGO_URI is not set')
}

const g = globalThis

if (!g.__betterAuthMongo) {
    g.__betterAuthMongo = { client: null, promise: null }
}

async function getMongoClient() {
    if (g.__betterAuthMongo.client) return g.__betterAuthMongo.client
    if (!g.__betterAuthMongo.promise) {
        const client = new MongoClient(uri, {
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        })
        g.__betterAuthMongo.promise = client.connect()
    }
    g.__betterAuthMongo.client = await g.__betterAuthMongo.promise
    return g.__betterAuthMongo.client
}

const client = await getMongoClient()
const db = client.db()

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: { enabled: true },
    user: {
        additionalFields: {
            forcePasswordChange: {
                type: "boolean",
                required: false,
                defaultValue: false
            }
        }
    }
})
