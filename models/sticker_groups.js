const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stickerGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sticker_ids: {
        type: [mongoose.Types.ObjectId],
        default: [],
    }
});

stickerGroupSchema.statics.findOneOrCreate = function(search_params) {

    return this.findOne(search_params).then(object => {
        if(!object)
        {
            this.create(search_params).then(object => object);
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