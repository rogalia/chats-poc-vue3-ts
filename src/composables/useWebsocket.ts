import { ref, onMounted, onUnmounted } from 'vue'
import { useChatStore } from '@/stores/chat'

import { io, type Socket } from 'socket.io-client'

export function useWebsocket() {
    const store = useChatStore()

    const wsLoading = ref(false)

    let socket: Socket | null = null

    const sendWSMessage = (text: string) => {
        if (!text.trim() || wsLoading.value || !socket) {
            return
        }

        const userMessage: Message = {
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString()
        }

        store.addWsMessage(userMessage)
        wsLoading.value = true

        socket.emit('chat:message', text)
    }

    onMounted(() => {
        socket = io(API.websocket)

        socket.on(
            'chat:responce',
            (responce: string) => {
                store.addWsMessage({
                    text: responce,
                    isUser: false,
                    timestamp: new Date().toLocaleTimeString()
                })

                wsLoading.value = false
            }
        )
    })

    onUnmounted(() => {
        socket?.disconnect()
    })

    return {
        wsMessages: store.wsMessages,
        wsLoading: wsLoading,
        sendWSMessage
    }
}