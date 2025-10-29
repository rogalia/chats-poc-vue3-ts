<template>
    <Chat title="REST chat"
          :messages="restMessages"
          :loading="restLoading"
          @send="sendRESTMessage"
    />
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue'

import { useRest } from '@/composables/useRest'

const { restMessages, restLoading, sendRESTMessage } = useRest()
</script>