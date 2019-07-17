var express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const api = require('./routes/api');
var app = express();
var cors = require('cors');
const parser = require('body-parser')


app.use(parser.urlencoded({ extended: true }))

app.use(parser.json())

app.use(cors())

app.use('/api', api)

app.use(express.static(path.resolve(__dirname, 'Client/public/')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'Client/public/index.html'))
})

mongoose.connect('mongodb+srv://aji199804:@aji12345@cluster0-t4639.mongodb.net/tekkom?retryWrites=true', { useNewUrlParser: true })
	.then(() => {
		console.log('MongoDB Connected')
		app.listen(process.env.PORT ? process.env.PORT : 4000, () => console.log(`Running with port ${process.env.PORT ? process.env.PORT : 4000}`))
	})
	.catch(err => {
		console.log('Error on connecting mongodb:', err)
	})


