<template>
    <div class="both-chats">
        <h1>Both chats</h1>

        <div class="both-chats__wrapper">
                <Chat :messages="restMessages"
                      :loading="restLoading"
                      @sendMessage="sendRestMessage"
                      @deleteMessage="deleteRestMessage"
                      @clearChat="clearRestChat"
                >
                    <template v-slot:header-name>
                        <h4>
                            REST chat
                        </h4>
                    </template>
                </Chat>

                <Chat :messages="wsMessages"
                      :loading="wsLoading"
                      @sendMessage="sendWsMessage"
                      @deleteMessage="deleteWsMessage"
                      @clearChat="clearWsChat"
                >
                    <template v-slot:header-name>
                        <h2>
                            Websocket chat
                        </h2>
                    </template>
                </Chat>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useRest } from '@/composables/useRest'
const { restMessages, restLoading, sendRestMessage, deleteRestMessage, clearRestChat } = useRest()

import { useWebsocket } from '@/composables/useWebsocket'
const { wsMessages, wsLoading, sendWsMessage, deleteWsMessage, clearWsChat } = useWebsocket()
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