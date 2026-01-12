<template>
    <div class="chat">
        <h3>
            {{ title }}
        </h3>

        <div class="chat__messages"
             ref="messagesEl"
        >
            <div class="chat__message"
                 :class="{ 'chat__message--bot': !message.isUser }"
                 v-for="(message, i) in messages"
                 :key="i"
            >
                {{ message.text }}

                <span class="chat__message-time">
                    {{ message.timestamp }}
                </span>
            </div>
        </div>

        <form class="chat__form"
              @submit.prevent="send"
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
import { ref, nextTick, watch } from 'vue'

const props = defineProps<{
    messages: Message[]
    title: string
    loading?: boolean
}>()

const emit = defineEmits<{
    send: [text: string]
}>()

const input = ref('')
const messagesEl = ref<HTMLElement | null>(null)

const send = () => {
    const trimmedValue = input.value.trim()

    if (!trimmedValue) {
        return
    }

    emit(
        'send',
        trimmedValue
    )

    input.value = ''
}

watch(props.messages, () => {
    nextTick(() => {
        if (messagesEl.value) {
            messagesEl.value.scrollTop = messagesEl.value.scrollHeight
        }
    })
})
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

.chat__message-time {
    font-size: 0.7em;
    opacity: 0.7;
    margin-top: 4px;
    display: block;
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