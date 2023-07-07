import express, { Application } from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import env from './config/env'
import socket_io from './socket'
import prisma from './config/db'
import setup from './config/setup'
import routes from './routes/routes'

// setup server
const PORT: string | number = env.PORT || 4000
const app: Application = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' },
})

// setup express
setup.express(app)

// routes
app.use('/api', routes.guest())
app.use('/api', routes.auth())

// error handling
setup.handler(app)

// socket io
io.on('connection', (socket: Socket) => {
  socket_io(socket)
})

// run server
;(async () => {
  try {
    await prisma.$connect()
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
})()
