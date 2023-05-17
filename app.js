require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const stickersRouter = require('./routers/stickers');
const gifsRouter = require('./routers/gifs');

const app = express();

// Middlewares
app.use(express.json());
app.use(
	cors({
		origin: [
			'https://meet.google.com',
			'chrome-extension://dnoalbddcffeeifbjakbmgdaljbfeamf',
		],
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	})
);
app.use(morgan(':method\t:url\t:status'));

// Routes
app.use('/sticker', stickersRouter);
app.use('/gif', gifsRouter);

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gstamps.lbs8z8i.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(process.env.PORT || 3000);
	});
