require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const stickersRouter = require("./routers/stickers");


const app = express();


// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use("/sticker", stickersRouter);


mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gstamps.fqjza.mongodb.net/gstamps?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT || 3000);
    });