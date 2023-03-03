const express = require("express");

const gifsControllers = require("../controllers/gifs");


const router = express.Router();

router.get("/search", gifsControllers.getGifs);

module.exports = router;