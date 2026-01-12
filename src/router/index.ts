import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/rest-chat',
        name: 'RestChat',
        component: () => import('@/views/RestChat.vue')
    },
    {
        path: '/websocket-chat',
        name: 'WebsocketChat',
        component: () => import('@/views/WebsocketChat.vue')
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/index'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router