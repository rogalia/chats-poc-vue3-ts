<template>
    <Chat title="REST chat"
          :messages="restMessages"
          :loading="restLoading"
          @sendMessage="sendRESTMessage"
          @deleteMessage="deleteRESTMessage"
          @clearChat="clearRESTChat"
    />
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useRest } from '@/composables/useRest'

const { restMessages, restLoading, sendRESTMessage, deleteRESTMessage, clearRESTChat } = useRest()
</script>