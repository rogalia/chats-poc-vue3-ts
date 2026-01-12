<template>
    <div class="message"
         :class="{ 'message--bot': !message.isUser }"
    >
        {{ message.text }}

        <div class="message__footer">
            <span class="message__time">
                {{ displayedTime }}
            </span>

            <Delete class="message__delete"
                    :class="{ 'message__delete--white': message.isUser }"
                    @click="deleteMessage"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    message: Message
}>()

const displayedTime = computed(() => new Date(props.message.timestamp).toLocaleTimeString())

import Delete from "@/assets/delete.svg"

const emit = defineEmits<{
    deleteMessage: []
}>()

const deleteMessage = () => {
    emit('deleteMessage')
}
</script>

<style scoped>
.message {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 18px;
    word-wrap: break-word;
    align-self: flex-end;
    background: #007bff;
    color: white;
}

.message--bot {
    align-self: flex-start;
    background: #e5e5ea;
    color: #000;
}

.message__footer {
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.message__time {
    font-size: 0.7em;
    opacity: 0.7;
    display: block;
}

.message__delete {
    width: 16px;
    height: 16px;
    margin-left: 16px;
    cursor: pointer;
    stroke: black;
}

.message__delete--white {
    stroke: white;
}
</style>