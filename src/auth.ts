import { useLocalStorage } from '@/localStorage'
import { digest } from '@/utils/sha1'

export const auth = useLocalStorage<{
    title: string
    session: string
    expiration: number
} | null>(`auth-${import.meta.env.BASE_URL}`, null)

export const checkAuth = () => {
    if (!auth.value) return
    if (Date.now() < auth.value.expiration) return

    auth.value = null
}

setInterval(checkAuth, 1000)

export const createAuthAttempt = async () => {
    const key = crypto.randomUUID()
    const hash = await digest(new TextEncoder().encode(key))

    return {
        key,
        url: `https://open.sonolus.com/external-login/${window.location.host}${import.meta.env.BASE_URL}sonolus/web/authenticate/${hash}`,
    }
}
