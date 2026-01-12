import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'

import { useChatStore } from '@/stores/chat'

export function useRest() {
    const store = useChatStore()

    const { restMessages } = storeToRefs(store)

    const restLoading = ref(false)

    const sendRESTMessage = async (text: string) => {
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
            const responce = await axios.post(
                API.rest,
                {
                    message: text
                }
            )

            store.addRestMessage({
                text: responce.data.reply,
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

    const deleteRESTMessage = (timestamp: number) => {
        store.deleteRestMessage(timestamp)
    }

    return {
        restMessages,
        restLoading,
        sendRESTMessage,
        deleteRESTMessage
    }
}