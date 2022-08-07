const express = require("express");

const stickerControllers = require("../controllers/stickers");


const router = express.Router();


router.post("/create", stickerControllers.createSticker);
router.get("/get-one", stickerControllers.getOneSticker);
router.get("/get-all", stickerControllers.getStickers);
router.patch("/add-to-group", stickerControllers.addStickerToGroup);
router.get("/get-group", stickerControllers.getGroupStickers);
router.get("/get-all-groups", stickerControllers.getAllGroups);
router.patch("/add-user", stickerControllers.addStickerUser);
router.patch("/remove-user", stickerControllers.removeStickerUser);

module.exports = router;