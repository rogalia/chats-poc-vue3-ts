import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { io, type Socket } from 'socket.io-client'

import { useChatStore } from '@/stores/chat'

export function useWebsocket() {
    const store = useChatStore()

    const { wsMessages } = storeToRefs(store)

    const wsLoading = ref(false)

    let socket: Socket | null = null

    onMounted(() => {
        socket = io(API.websocket)

        socket.on(
            'chat:responce',
            (responce: string) => {
                store.addWsMessage({
                    text: responce,
                    isUser: false,
                    timestamp: Date.now()
                })

                wsLoading.value = false
            }
        )
    })

    onUnmounted(() => {
        socket?.disconnect()
    })

    const sendWsMessage = (text: string) => {
        if (!text.trim() || wsLoading.value || !socket) {
            return
        }

        const userMessage: Message = {
            text,
            isUser: true,
            timestamp: Date.now()
        }

        store.addWsMessage(userMessage)
        wsLoading.value = true

        socket.emit('chat:message', text)
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