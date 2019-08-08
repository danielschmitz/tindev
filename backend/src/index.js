const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./rotas");
const servidor = express();
require("dotenv").config();

servidor.use(cors());
servidor.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});
servidor.use("/", express.static(__dirname + "/../../frontend/dist"));
servidor.use(router);
const port = process.env.PORT || 9999;
servidor.listen(port, function () {
  console.log(`Servidor executando em ${port}`)
});
