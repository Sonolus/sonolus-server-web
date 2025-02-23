import { auth, checkAuth } from '@/auth'
import { configuration } from '@/configuration'

export const sonolusGet = async <T>(options: { url: string; query?: Record<string, string> }) => {
    const params = new URLSearchParams({
        ...configuration.value,
        ...options.query,
    })

    const response = await fetch(`${import.meta.env.BASE_URL}sonolus${options.url}?${params}`, {
        headers: getAuthHeaders(),
    })
    return (await response.json()) as T
}

export const sonolusPost = async <T>(options: {
    url: string
    query?: Record<string, string>
    body: object
}) => {
    const params = new URLSearchParams({
        ...configuration.value,
        ...options.query,
    })

    const response = await fetch(`${import.meta.env.BASE_URL}sonolus${options.url}?${params}`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(options.body),
    })
    return (await response.json()) as T
}

const getAuthHeaders = () => {
    checkAuth()
    if (!auth.value) return

    return {
        'Sonolus-Session': auth.value.session,
    }
}
