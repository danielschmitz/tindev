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
servidor.use(router);
servidor.listen(9999);
