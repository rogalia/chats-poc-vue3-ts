<template>
    <Chat title="Websocket chat"
          :messages="wsMessages"
          :loading="wsLoading"
          @sendMessage="sendWsMessage"
          @deleteMessage="deleteWsMessage"
    />
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useWebsocket } from '@/composables/useWebsocket'

const { wsMessages, wsLoading, sendWsMessage, deleteWsMessage } = useWebsocket()
</script>