import { ref, computed, readonly } from 'vue'
import { useChatStore } from '@/stores/chat'

import axios from 'axios'

export function useRest() {
    const store = useChatStore(),
        restLoading = ref(false),
        restMessages = computed(() => store.getRestMessages)

    const sendRESTMessage = async (text: string) => {
        if (!text.trim() || restLoading.value) {
            return
        }

        const userMessage: Message = {
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString()
        }

        store.addRestMessage(userMessage)
        restLoading.value = true

        try {
            const res = await axios.post(
                API.rest,
                {
                    message: text
                }
            )

            store.addRestMessage({
                text: res.data.reply,
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
            })
        } catch (err) {
            store.addRestMessage({
                text: 'Server error',
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
            })
        } finally {
            restLoading.value = false
        }
    }

    return {
        restMessages: readonly(restMessages),
        restLoading: readonly(restLoading),
        sendRESTMessage
    }
}