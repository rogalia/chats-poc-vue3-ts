import { Config } from '@/api/config'

import { io, type Socket } from 'socket.io-client'

let socket: Socket | null  = null

export function connectWS(messageHandler: (message: string) => void) {
    socket = io(Config.websocket)
    
    socket.on(
        'chat:response',
        messageHandler
    )
}

export function disconnectWS() {
    socket?.disconnect()
}

export function sendWsMessageAPI(text: string) {
    socket?.emit('chat:message', text)
}
