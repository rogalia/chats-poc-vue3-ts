import { defineStore } from 'pinia'
import { ref } from 'vue'

const LOCAL_STORAGE_KEYS = {
    REST_MESSAGES: 'restMessages',
    WS_MESSAGES: 'wsMessages',
} as const

type StorageKey = typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS]

export const useChatStore = defineStore('chat', () => {
    const restMessages = ref<Message[]>([])
    const wsMessages = ref<Message[]>([])

    function loadMessagesFromLocalStorage() {
        const rest = localStorage.getItem(LOCAL_STORAGE_KEYS.REST_MESSAGES)
        const ws = localStorage.getItem(LOCAL_STORAGE_KEYS.WS_MESSAGES)

        if (rest) {
            restMessages.value = JSON.parse(rest)
        }
        if (ws) {
            wsMessages.value = JSON.parse(ws)
        }
    }

    function syncWithLocalStorage(storageKey: StorageKey, messages: Message[]) {
        localStorage.setItem(storageKey, JSON.stringify(messages))
    }
    function addRestMessage(message: Message) {
        restMessages.value.push(message)

        syncWithLocalStorage(LOCAL_STORAGE_KEYS.REST_MESSAGES, restMessages.value)
    }
    
    function deleteRestMessage(timestamp: number) {
        restMessages.value = restMessages.value.filter(message => message.timestamp !== timestamp)
        
        syncWithLocalStorage(LOCAL_STORAGE_KEYS.REST_MESSAGES, restMessages.value)
    }
    
    function clearRestChat() {
        restMessages.value = []
        
        syncWithLocalStorage(LOCAL_STORAGE_KEYS.REST_MESSAGES, restMessages.value)
    }
    
    // intentionally duplicated logic for clarity and separation of transport streams
    function addWsMessage(message: Message) {
        wsMessages.value.push(message)

        syncWithLocalStorage(LOCAL_STORAGE_KEYS.WS_MESSAGES, wsMessages.value)
    }

    function deleteWsMessage(timestamp: number) {
        wsMessages.value = wsMessages.value.filter(message => message.timestamp !== timestamp)

        syncWithLocalStorage(LOCAL_STORAGE_KEYS.WS_MESSAGES, wsMessages.value)
    }
    
    function clearWsChat() {
        wsMessages.value = []
        
        syncWithLocalStorage(LOCAL_STORAGE_KEYS.WS_MESSAGES, wsMessages.value)
    }

    return {
        restMessages,
        wsMessages,
        loadMessagesFromLocalStorage,
        addRestMessage,
        addWsMessage,
        deleteRestMessage,
        deleteWsMessage,
        clearRestChat,
        clearWsChat
    }
})