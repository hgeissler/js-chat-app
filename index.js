// -----------------------------------------------------------------------------
// Configure Express
// -----------------------------------------------------------------------------
// setting up server
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

// how do we serve client-side files (e.g. public-folder)
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
// --> views-folder -> ejs files
app.set('view engine', 'ejs')

server.listen(process.env.PORT || 3000, () => console.log('Server listening'))

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------
// views/chat.ejs
app.get("/", (req,res) => res.render("chat"))

// -----------------------------------------------------------------------------
// Configure Web Sockets
// -----------------------------------------------------------------------------
io.sockets.on("connection", function(socket) {
  socket.on("chat-message", function(message) {
    io.sockets.emit("chat-message", message)
  })
})