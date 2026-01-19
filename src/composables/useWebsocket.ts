import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

import { connectWS, disconnectWS, sendWsMessageApi } from '@/services/wsChat.service'

import { useChatStore } from '@/stores/chat'

export function useWebsocket() {
    const store = useChatStore()

    const { wsMessages } = storeToRefs(store)

    const wsLoading = ref(false)

    onMounted(() => {
        connectWS((response: string) => {
            store.addWsMessage({
                text: response,
                isUser: false,
                timestamp: Date.now()
            })
            
            wsLoading.value = false
        })
    })

    onUnmounted(() => {
        disconnectWS()
    })

    const sendWsMessage = (text: string) => {
        if (!text.trim() || wsLoading.value) {
            return
        }

        const userMessage: Message = {
            text,
            isUser: true,
            timestamp: Date.now()
        }

        store.addWsMessage(userMessage)
        wsLoading.value = true

        sendWsMessageApi(text)
    }

    const deleteWsMessage = (timestamp: number) => {
        store.deleteWsMessage(timestamp)
    }
    
    const clearWsChat = () => {
        store.clearWsChat()
    }

    return {
        wsMessages,
        wsLoading,
        sendWsMessage,
        deleteWsMessage,
        clearWsChat
    }
}