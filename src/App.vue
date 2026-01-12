<template>
    <div class="app">
        <nav class="nav">
            <router-link to="/index">
                Both chats
            </router-link>
            <router-link to="/rest-chat">
                Rest chat
            </router-link>
            <router-link to="/websocket-chat">
                Websocket chat
            </router-link>
        </nav>

        <main class="main">
            <router-view/>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat'

useChatStore().loadMessagesFromStorage()
</script>

<style scoped>
.app {
    font-family: Arial, sans-serif;
}

.nav {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 160px;
    height: 100vh;
    gap: 20px;
    margin-bottom: 30px;
    padding: 16px;
    background: #E6E6E6;
}

.nav a {
    display: block;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background 0.2s;
    margin-bottom: 16px;
}

.nav a:hover,
.nav a.router-link-active {
    background: #007bff;
    color: white;
}

.main {
    width: calc(100vw - 160px);
    margin-left: 160px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: #333;
}
</style>