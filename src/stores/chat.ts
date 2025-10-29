import { defineStore } from 'pinia'

interface ChatState {
    restMessages: Message[]
    wsMessages: Message[]
}

export const useChatStore = defineStore('chat', {
    state: (): ChatState => ({
        restMessages: [],
        wsMessages: [],
    }),

    getters: {
        getRestMessages: (state) => state.restMessages,
        getWsMessages: (state) => state.wsMessages,
    },

    actions: {
        loadFromStorage() {
            const rest = localStorage.getItem('restMessages'),
                ws = localStorage.getItem('wsMessages')

            if (rest) {
                this.restMessages = JSON.parse(rest)
            }
            if (ws) {
                this.wsMessages = JSON.parse(ws)
            }
        },

        addRestMessage(message: Message) {
            this.restMessages.push(message)

            localStorage.setItem('restMessages', JSON.stringify(this.restMessages))
        },

        addWsMessage(message: Message) {
            this.wsMessages.push(message)

            localStorage.setItem('wsMessages', JSON.stringify(this.wsMessages))
        },
    },
})