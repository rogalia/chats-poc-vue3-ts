import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { getRandomResponce } from './messages'

const app = express(),
    httpServer = createServer(app),
    io = new Server(
        httpServer,
        {
            cors: {
                origin: 'http://localhost:5173'
            }
        }
    ),
    PORT = 3000

app.use(cors())
app.use(express.json())

app.post('/api/chat/message', (req, res) => {
    const userMessage = req.body.message

    if (!userMessage) {
        return res.status(400).json({ error: 'No message' })
    }

    setTimeout(() => {
        res.json({ reply: getRandomResponce() })
    }, 800) // imitation of delay
})

io.on('connection', (socket) => {
    socket.on('chat:message', (msg: string) => {
        setTimeout(() => {
            socket.emit('chat:response', getRandomResponce())
        }, 600) // imitation of delay
    })
})

httpServer.listen(PORT, () => { })