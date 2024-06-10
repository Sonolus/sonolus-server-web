import { getOpenInSonolusUrl } from '@/components/OpenInSonolus.vue'
import BaseView from '@/views/BaseView.vue'
import JumpToPageView from '@/views/JumpToPageView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { detailsViews } from '@/views/details'
import HomeView from '@/views/home/HomeView.vue'
import ItemInfoView from '@/views/infos/ItemInfoView.vue'
import ItemListView from '@/views/lists/ItemListView.vue'
import ItemSearchView from '@/views/search/ItemSearchView.vue'
import type { Component } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const defineRoutes = (
    ...routes: {
        name: string
        path: string
        component: Component
        props?: object
    }[]
) =>
    routes.map(
        ({ name, path, component, props }): RouteRecordRaw => ({
            name,
            path,
            component: BaseView,
            props: ({ params, query }) => ({
                url: (component as never)['url'],
                loading: (component as never)['loading'],
                error: (component as never)['error'],
                title: (component as never)['title'],
                banner: (component as never)['banner'],
                component,
                componentProps: { ...params, query, ...props },
            }),
        }),
    )

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: defineRoutes(
        { name: 'home', path: '/', component: HomeView },

        ...(
            [
                'rooms',
                'posts',
                'playlists',
                'levels',
                'replays',
                'skins',
                'backgrounds',
                'effects',
                'particles',
                'engines',
            ] as const
        ).flatMap((type) => [
            {
                name: `${type}-info`,
                path: `/${type}/info`,
                component: ItemInfoView,
                props: { type },
            },
            {
                name: `${type}-list`,
                path: `/${type}/list`,
                component: ItemListView,
                props: { type },
            },
            {
                name: `${type}-search`,
                path: `/${type}/search`,
                component: ItemSearchView,
                props: { type },
            },
            {
                name: `${type}-jump`,
                path: `/${type}/jump`,
                component: JumpToPageView,
                props: { type },
            },
            {
                name: `${type}-details`,
                path: `/${type}/:name`,
                component: detailsViews[type],
                props: { type },
            },
        ]),

        { name: 'notFound', path: '/:_(.*)', component: NotFoundView },
    ),
})

router.beforeEach((to, from) => {
    if (to.name !== 'rooms-details') return true

    const url = getOpenInSonolusUrl(to.fullPath)
    if (from.name) {
        open(url, '_blank')
    } else {
        location.href = url
    }

    return false
})
