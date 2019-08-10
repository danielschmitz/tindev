const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./rotas");
require("dotenv").config();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query
  console.log(`Registrei o user ${user} com id ${socket.id}`)
  connectedUsers[user] = socket.id;
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://daniel:secret1@ds261077.mlab.com:61077/tindev', {
  useNewUrlParser: true
});
app.use("/", express.static(__dirname + "/../../frontend/dist"));
app.use(router);
const port = process.env.PORT || 9999;

server.listen(port, function () {
  console.log(`Servidor executando em ${port}`)
});
