const mongoose = require("mongoose");
const { search } = require("../routers/stickers");

const Schema = mongoose.Schema;

const stickerGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sticker_ids: [
        {type: mongoose.Types.ObjectId, ref: "stickers"},
    ],
    group_id: {
        type: String,
        required: true,
        unique: true
    }
});

stickerGroupSchema.statics.findOneOrCreate = function(search_params) {

    return this.findOne({group_id: search_params.group_id}).then(object => {
        console.log(object)
        if(!object)
        {
            return this.create(search_params);
        }
        else
        {
            return object;
        }
    }).catch(err => {
        console.log("Error in findOneOrCreate static function of stickerGroupSchema");
        console.log(err);
    });

}

module.exports = mongoose.model("stickerGroups", stickerGroupSchema);