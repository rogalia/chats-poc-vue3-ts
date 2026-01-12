<template>
    <div class="both-chats">
        <h1>Both chats</h1>

        <div class="both-chats__wrapper">
                <Chat title="REST chat"
                      :messages="restMessages"
                      :loading="restLoading"
                      @sendMessage="sendRESTMessage"
                      @deleteMessage="deleteRESTMessage"
                />

                <Chat title="Websocket chat"
                      :messages="wsMessages"
                      :loading="wsLoading"
                      @sendMessage="sendWsMessage"
                      @deleteMessage="deleteWsMessage"
                />
        </div>
    </div>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useRest } from '@/composables/useRest'
const { restMessages, restLoading, sendRESTMessage, deleteRESTMessage } = useRest()

import { useWebsocket } from '@/composables/useWebsocket'
const { wsMessages, wsLoading, sendWsMessage, deleteWsMessage } = useWebsocket()
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