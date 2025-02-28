import { configuration } from '@/configuration'

export const sonolusGet = async <T>(options: { url: string; query?: Record<string, string> }) => {
    const params = new URLSearchParams({
        ...configuration.value,
        ...options.query,
    })

    const response = await fetch(`${import.meta.env.BASE_URL}sonolus${options.url}?${params}`)
    return (await response.json()) as T
}
