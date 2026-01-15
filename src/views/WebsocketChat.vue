<template>
    <Chat title="Websocket chat"
          :messages="wsMessages"
          :loading="wsLoading"
          @sendMessage="sendWsMessage"
          @deleteMessage="deleteWsMessage"
          @clearChat="clearWsChat"
    />
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useWebsocket } from '@/composables/useWebsocket'

const { wsMessages, wsLoading, sendWsMessage, deleteWsMessage, clearWsChat } = useWebsocket()
</script>