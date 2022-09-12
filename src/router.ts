import { createRouter, createWebHistory } from 'vue-router'

import BackgroundDetailsRoute from './routes/details/BackgroundDetailsRoute.vue'
import EffectDetailsRoute from './routes/details/EffectDetailsRoute.vue'
import EngineDetailsRoute from './routes/details/EngineDetailsRoute.vue'
import LevelDetailsRoute from './routes/details/LevelDetailsRoute.vue'
import ParticleDetailsRoute from './routes/details/ParticleDetailsRoute.vue'
import SkinDetailsRoute from './routes/details/SkinDetailsRoute.vue'
import HomeRoute from './routes/HomeRoute.vue'
import JumpRoute from './routes/JumpRoute.vue'
import BackgroundListRoute from './routes/lists/BackgroundListRoute.vue'
import EffectListRoute from './routes/lists/EffectListRoute.vue'
import EngineListRoute from './routes/lists/EngineListRoute.vue'
import LevelListRoute from './routes/lists/LevelListRoute.vue'
import ParticleListRoute from './routes/lists/ParticleListRoute.vue'
import SkinListRoute from './routes/lists/SkinListRoute.vue'
import NotFoundRoute from './routes/NotFoundRoute.vue'
import SearchRoute from './routes/SearchRoute.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeRoute,
        },
        {
            path: '/levels/list',
            name: 'level-list',
            component: LevelListRoute,
        },
        {
            path: '/skins/list',
            name: 'skin-list',
            component: SkinListRoute,
        },
        {
            path: '/backgrounds/list',
            name: 'background-list',
            component: BackgroundListRoute,
        },
        {
            path: '/effects/list',
            name: 'effect-list',
            component: EffectListRoute,
        },
        {
            path: '/particles/list',
            name: 'particle-list',
            component: ParticleListRoute,
        },
        {
            path: '/engines/list',
            name: 'engine-list',
            component: EngineListRoute,
        },
        {
            path: '/levels/:name',
            name: 'level-details',
            component: LevelDetailsRoute,
        },
        {
            path: '/skins/:name',
            name: 'skin-details',
            component: SkinDetailsRoute,
        },
        {
            path: '/backgrounds/:name',
            name: 'background-details',
            component: BackgroundDetailsRoute,
        },
        {
            path: '/effects/:name',
            name: 'effect-details',
            component: EffectDetailsRoute,
        },
        {
            path: '/particles/:name',
            name: 'particle-details',
            component: ParticleDetailsRoute,
        },
        {
            path: '/engines/:name',
            name: 'engine-details',
            component: EngineDetailsRoute,
        },
        {
            path: '/search/:index',
            name: 'search',
            component: SearchRoute,
        },
        {
            path: '/jump/:index',
            name: 'jump',
            component: JumpRoute,
        },
        {
            path: '/:match(.*)*',
            name: 'not-found',
            component: NotFoundRoute,
        },
    ],

    scrollBehavior(to, from, position) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(position || { top: 0 }), 200)
        })
    },
})

export default router
