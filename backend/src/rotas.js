const express = require("express");
const DevController = require("./controller/devController");
const LikeController = require("./controller/likeController");
const DislikeController = require("./controller/dislikeController");
const router = express.Router();

router.get("/devs", DevController.listar);
router.post("/devs", DevController.armazenar);
router.post("/devs/:IdDev/likes", LikeController.armazenar);
router.post("/devs/:IdDev/dislikes", DislikeController.armazenar);

module.exports = router;
