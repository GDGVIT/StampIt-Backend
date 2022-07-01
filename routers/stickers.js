const express = require("express");

const stickerControllers = require("../controllers/stickers");


const router = express.Router();


router.post("/create", stickerControllers.createSticker);


module.exports = router;