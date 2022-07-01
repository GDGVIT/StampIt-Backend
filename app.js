require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const stickersRouter = require("./routers/stickers");


const app = express();


// Middlewares
app.use(express.json());


// Routes
app.use("/sticker", stickersRouter);


mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gstamps.fqjza.mongodb.net/gstamps?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000);
});