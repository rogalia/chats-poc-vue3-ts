import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { sendRestMessageAPI } from '@/services/restChat.service'

import { useChatStore } from '@/stores/chat'

export function useRest() {
    const store = useChatStore()

    const { restMessages } = storeToRefs(store)

    const restLoading = ref(false)

    const sendRestMessage = async (text: string) => {
        if (!text.trim() || restLoading.value) {
            return
        }

        const userMessage: Message = {
            text,
            isUser: true,
            timestamp: Date.now()
        }

        store.addRestMessage(userMessage)
        restLoading.value = true

        try {
            const responseData = await sendRestMessageAPI(text)

            store.addRestMessage({
                text: responseData.reply,
                isUser: false,
                timestamp: Date.now()
            })
        } catch (err) {
            store.addRestMessage({
                text: 'Server error',
                isUser: false,
                timestamp: Date.now()
            })
        } finally {
            restLoading.value = false
        }
    }

    const deleteRestMessage = (timestamp: number) => {
        store.deleteRestMessage(timestamp)
    }
    
    const clearRestChat = () => {
        store.clearRestChat()
    }

    return {
        restMessages,
        restLoading,
        sendRestMessage,
        deleteRestMessage,
        clearRestChat
    }
}