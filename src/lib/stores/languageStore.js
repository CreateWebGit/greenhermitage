import { writable } from 'svelte/store'
import { browser } from '$app/environment'

const defaultLanguage = 'sv'
const storedLanguage = browser ? window.localStorage.getItem('gh-language') : null

export const language = writable(storedLanguage || defaultLanguage)

if (browser) {
    language.subscribe((value) => {
        const normalized = value === 'en' ? 'en' : 'sv'
        window.localStorage.setItem('gh-language', normalized)
        document.documentElement.setAttribute('lang', normalized)
    })
}