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
    handle401(response)

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
    handle401(response)

    return (await response.json()) as T
}

export const sonolusUpload = async <T>(options: {
    url: string
    query?: Record<string, string>
    key: string
    hashes: string[]
    files: Record<string, File>
}) => {
    const params = new URLSearchParams({
        ...configuration.value,
        ...options.query,
    })

    const body = new FormData()
    for (const hash of options.hashes) {
        const file = options.files[hash]
        if (!file) throw new Error(`File ${hash} not found`)

        body.append('files', file, hash)
    }

    const response = await fetch(`${import.meta.env.BASE_URL}sonolus${options.url}?${params}`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            'Sonolus-Upload-Key': options.key,
        },
        body,
    })
    handle401(response)

    return (await response.json()) as T
}

const getAuthHeaders = () => {
    checkAuth()
    if (!auth.value) return

    return {
        'Sonolus-Session': auth.value.session,
    }
}

const handle401 = (response: Response) => {
    if (response.status !== 401) return

    auth.value = null
}
