<template>
    <Chat title="Websocket chat"
          :messages="wsMessages"
          :loading="wsLoading"
          @send="sendWSMessage"
    />
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useWebsocket } from '@/composables/useWebsocket'

const { wsMessages, wsLoading, sendWSMessage } = useWebsocket()
</script>