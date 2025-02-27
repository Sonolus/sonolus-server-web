import { getOpenInSonolusUrl } from '@/components/OpenInSonolus'
import { paths } from '@/utils/item'
import AuthenticationView from '@/views/authentication/AuthenticationView.vue'
import BaseView from '@/views/BaseView.vue'
import ConfigurationView from '@/views/configuration/ConfigurationView.vue'
import { detailsViews } from '@/views/details'
import HomeView from '@/views/home/HomeView.vue'
import ItemInfoView from '@/views/infos/ItemInfoView.vue'
import ItemActionView from '@/views/ItemActionView.vue'
import ItemCreateView from '@/views/ItemCreateView.vue'
import ItemSearchView from '@/views/ItemSearchView.vue'
import JumpToPageView from '@/views/JumpToPageView.vue'
import ItemListView from '@/views/lists/ItemListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
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
                url: (component as { url: never }).url,
                loading: (component as { loading: never }).loading,
                error: (component as { error: never }).error,
                title: (component as { title: never }).title,
                banner: (component as { banner: never }).banner,
                component,
                componentProps: { ...params, query, ...props },
            }),
        }),
    )

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: defineRoutes(
        { name: 'home', path: '/', component: HomeView },

        { name: 'authentication', path: '/authentication', component: AuthenticationView },
        { name: 'configuration', path: '/configuration', component: ConfigurationView },

        ...(
            [
                'room',
                'post',
                'playlist',
                'level',
                'replay',
                'skin',
                'background',
                'effect',
                'particle',
                'engine',
            ] as const
        ).flatMap((type) => [
            {
                name: `${type}-info`,
                path: `/${paths[type]}/info`,
                component: ItemInfoView,
                props: { type },
            },
            {
                name: `${type}-create`,
                path: `/${paths[type]}/info`,
                component: ItemCreateView,
                props: { type },
            },
            {
                name: `${type}-list`,
                path: `/${paths[type]}/list`,
                component: ItemListView,
                props: { type },
            },
            {
                name: `${type}-search`,
                path: `/${paths[type]}/search`,
                component: ItemSearchView,
                props: { type },
            },
            {
                name: `${type}-jump`,
                path: `/${paths[type]}/jump`,
                component: JumpToPageView,
                props: { type },
            },
            {
                name: `${type}-details`,
                path: `/${paths[type]}/:name`,
                component: detailsViews[type],
                props: { type },
            },
            {
                name: `${type}-action`,
                path: `/${paths[type]}/:name`,
                component: ItemActionView,
                props: { type },
            },
        ]),

        { name: 'notFound', path: '/:_(.*)', component: NotFoundView },
    ),
})

router.beforeEach((to, from) => {
    if (to.name !== 'room-details') return true

    const url = getOpenInSonolusUrl(to.fullPath)
    if (from.name) {
        open(url, '_blank')
    } else {
        location.href = url
    }

    return false
})
