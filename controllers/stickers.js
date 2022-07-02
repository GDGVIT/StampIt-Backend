const stickersModel = require("../models/stickers");
const stickerGroupsModel = require("../models/sticker_groups");

exports.createSticker = (req, res, next) => {
    const name = req.body.name;
    const data = req.body.data;

    stickersModel.create({
        name: name,
        data: data,
    }).then(object => {
        res.status(201).json({
            status: "success",
            message: "Sticker created successfully",
            data: {
                object_id: object._id,
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Unknown error occured",
            data: null
        })
    });
}

exports.getStickers = (req, res, next) => {
    stickersModel.find().then(objects => {
        res.status(200).json({
            status: "success",
            message: "Fetched stickers successfully",
            data: objects,
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Unknown error occured",
            data: null
        });
    });
}