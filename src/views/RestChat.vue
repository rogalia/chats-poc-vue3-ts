<template>
    <Chat title="REST chat"
          :messages="restMessages"
          :loading="restLoading"
          @sendMessage="sendRestMessage"
          @deleteMessage="deleteRestMessage"
          @clearChat="clearRestChat"
    />
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useRest } from '@/composables/useRest'

const { restMessages, restLoading, sendRestMessage, deleteRestMessage, clearRestChat } = useRest()
</script>