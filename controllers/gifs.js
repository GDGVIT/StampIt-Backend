require("dotenv").config()
const axios = require("axios");
const { search } = require("../routers/stickers");

exports.getGifs = (req, res, next) => {
    const search_param = req.query.search;
    const page = req.query.page; // default=0, maximum=4999
    const page_size = req.query.page_size;

    const options = {
        params: {
            api_key: process.env.GIPHY_API_KEY,
            q: search_param,
            limit: page_size+1,
            offset: (page-1)*page_size,
        }
    }

    axios.get("https://api.giphy.com/v1/gifs/search", options).then(response => {
        const response_length = response.data.data.length;

        res.status(200).json({
            status: "success",
            message: "GIFs retrieved successfully",
            data: {
                gifs: response.data.data.slice(0, -1),
                next_page: (response_length < page_size || page >= 4999) ? -1 : parseInt(page)+1,
            }
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