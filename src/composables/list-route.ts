import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useListRoute = () => {
    const route = useRoute()
    const search = computed(() => {
        const params = new URLSearchParams()

        for (const key in route.query) {
            params.append(key, `${route.query[key]}`)
        }

        const query = params.toString()
        return query && `?${query}`
    })
    const page = computed(() => parseInt(`${route.query.page}`) || 0)

    return { search, page }
}
