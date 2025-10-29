import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Index from '@/views/Index.vue'
import RestChat from '@/views/RestChat.vue'
import WebsocketChat from '@/views/WebsocketChat.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/rest-chat',
        name: 'RestChat',
        component: RestChat
    },
    {
        path: '/websocket-chat',
        name: 'WebsocketChat',
        component: WebsocketChat
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