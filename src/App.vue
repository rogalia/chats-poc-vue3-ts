<template>
    <div class="app">
        <Nav />

        <main class="main">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue';

import { useChatStore } from '@/stores/chat'

useChatStore().loadMessagesFromStorage()
</script>

<style scoped>
.app {
    font-family: Arial, sans-serif;
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