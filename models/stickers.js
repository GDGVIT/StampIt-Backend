const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stickerSchema = new Schema({
    name: {
        type: String,
    },
    data: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("stickers", stickerSchema);