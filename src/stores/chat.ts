import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
    const restMessages = ref<Message[]>([])
    const wsMessages = ref<Message[]>([])

    function loadMessagesFromStorage() {
        const rest = localStorage.getItem('restMessages')
        const ws = localStorage.getItem('wsMessages')

        if (rest) {
            restMessages.value = JSON.parse(rest)
        }
        if (ws) {
            wsMessages.value = JSON.parse(ws)
        }
    }

    function addRestMessage(message: Message) {
        restMessages.value.push(message)

        localStorage.setItem('restMessages', JSON.stringify(restMessages.value))
    }

    function addWsMessage(message: Message) {
        wsMessages.value.push(message)

        localStorage.setItem('wsMessages', JSON.stringify(wsMessages.value))
    }

    return {
        restMessages,
        wsMessages,
        loadMessagesFromStorage,
        addRestMessage,
        addWsMessage,
    }
})