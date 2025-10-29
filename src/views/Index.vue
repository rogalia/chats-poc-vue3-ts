<template>
    <div class="both-chats">
        <h1>Both chats</h1>

        <div class="both-chats__wrapper">
                <Chat title="REST chat"
                      :messages="restMessages"
                      :loading="restLoading"
                      @send="sendRESTMessage"
                />

                <Chat title="Websocket chat"
                      :messages="wsMessages"
                      :loading="wsLoading"
                      @send="sendWSMessage"
                />
        </div>
    </div>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue';

import { useRest } from '@/composables/useRest'
const { restMessages, restLoading, sendRESTMessage } = useRest()

import { useWebsocket } from '@/composables/useWebsocket'
const { wsMessages, wsLoading, sendWSMessage } = useWebsocket()
</script>

<style scoped>
.both-chats {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.both-chats__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
</style>