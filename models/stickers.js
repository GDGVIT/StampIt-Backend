const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stickerSchema = new Schema({
    name: {
        type: String,
    },
    data: {
        type: String,
        required: true
    },
    users: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model("stickers", stickerSchema);