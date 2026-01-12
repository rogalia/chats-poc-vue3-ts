<template>
    <div class="chat">
        <h3>
            {{ title }}
        </h3>

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
    title: string
    loading?: boolean
}>()

const emit = defineEmits<{
    sendMessage: [text: string],
    deleteMessage: [timestamp: number]
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

.chat__message {
    align-self: flex-end;
    background: #007bff;
    color: white;
}

.chat__message--bot {
    align-self: flex-start;
    background: #e5e5ea;
    color: #000;
}

.chat__message-footer {
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat__message-time {
    font-size: 0.7em;
    opacity: 0.7;
    display: block;
}

.chat__message-delete {
    width: 16px;
    height: 16px;
    margin-left: 16px;
    cursor: pointer;
    stroke: black;
}

.chat__message-delete--white {
    stroke: white;
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
}
</style>