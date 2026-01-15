<template>
    <div class="chat">
        <div class="chat__title">
            <slot name="header-name">
                <h3>
                    {{ title }}
                </h3>
            </slot>

            <button class="chat__clear-button"
                    :disabled="loading || !messages.length"
                    @click="clearChat"
            >
                Clear
                <Delete class="chat__clear-icon" />
            </button>
        </div>

        <div class="chat__messages"
             ref="messagesEl"
        >
            <Message v-for="message in messages"
                     :key="message.timestamp"
                     :message="message"
                     @deleteMessage="deleteMessage(message.timestamp)"
            />
        </div>

        <form class="chat__form"
              @submit.prevent="sendMessage"
        >
            <input class="chat__input"
                   v-model="input"
                   placeholder="Type a message..."
                   :disabled="loading" 
            />
            <button class="chat__button"
                    type="submit"
                    :disabled="loading || !input.trim()"
            >
                Send
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import Message from './Message.vue'

import { ref, nextTick, watch } from 'vue'

const props = defineProps<{
    messages: Message[]
    title?: string
    loading?: boolean
}>()

const emit = defineEmits<{
    sendMessage: [text: string],
    deleteMessage: [timestamp: number],
    clearChat: []
}>()

const input = ref('')
const messagesEl = ref<HTMLElement | null>(null)

const sendMessage = () => {
    const trimmedValue = input.value.trim()

    if (!trimmedValue) {
        return
    }

    emit('sendMessage', trimmedValue)

    input.value = ''
}

watch(
    props.messages,
    () => {
        nextTick(() => {
            if (messagesEl.value) {
                messagesEl.value.scrollTop = messagesEl.value.scrollHeight
            }
        })
    },
    {
        immediate: true
    }
)

const deleteMessage = (timestamp: number) => {
    emit('deleteMessage', timestamp)
}

import Delete from "@/assets/delete.svg"

const clearChat = () => {
    emit('clearChat')
}
</script>

<style scoped>
.chat {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px;
    height: 700px;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    margin-top: 20px;
    width: 500px;
}

.chat__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    color: black;
}

.chat__clear-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    background: transparent;
    font-size: 12px;
}

.chat__clear-button:disabled {
    cursor: not-allowed;
    pointer-events: none;
}

.chat__clear-icon {
    width: 12px;
    height: 12px;
    margin-left: 4px;
    stroke: red;
}

.chat__messages {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.chat__messages > div {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 18px;
    word-wrap: break-word;
}

.chat__form {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.chat__input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1em;
}

.chat__button {
    padding: 12px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.chat__button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}
</style>