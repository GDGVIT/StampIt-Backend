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

exports.getOneSticker = (req, res, next) => {
    const sticker_id = req.query.sticker_id;

    stickersModel.findOne({_id: sticker_id}).then(object => {
        console.log(object.data);
        res.status(200).json({
            status: "success",
            message: "Sticker sent successfully",
            data: object.data,
        })}).catch(err => {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: "Unknown error occured",
                data: null
            })
        })
    }

exports.getStickers = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const page_size = parseInt(req.query.page_size) || 1;

    stickersModel.find().skip((page-1) * page_size).limit(page_size).then(objects => {
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

exports.addStickerToGroup = (req, res, next) => {
    const group_id = req.query.group_id;
    const sticker_id = req.body.sticker_id;
    const name = req.query.name;

    stickerGroupsModel.findOneOrCreate({group_id: group_id, name: name}).then(object => {
        object.sticker_ids = [...object.sticker_ids, sticker_id];
        object.save();

        res.status(200).json({
            status: "success",
            message: "Group updated successfully",
            data: null,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Unknown error occured",
            data: null
        })
    })
};

exports.getGroupStickers = (req, res, next) => {
    const group_id = req.query.group_id;

    stickerGroupsModel.findOne({_id: group_id}).populate("sticker_ids").then(object => {
        res.status(200).json({
            status: "success",
            message: "Group retrieved successfully",
            data: object.sticker_ids,
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Unknown error occured",
            data: null
        });
    })
};

exports.getAllGroups = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const page_size = parseInt(req.query.page_size) || 1;

    stickerGroupsModel.find().skip((page-1) * page_size).limit(page_size).then(objects => {
        objects.forEach((element, index, objects) => {
            objects[index] = {
                _id: element._id,
                name: element.name,
                __v: element.__v,
            }
        });

        res.status(200).json({
            status: "success",
            message: "Groups retrieved successfully",
            data: objects,
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Unknown error occured",
            data: null
        });
    })
}