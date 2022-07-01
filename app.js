require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gstamps.fqjza.mongodb.net/gstamps?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000);
});