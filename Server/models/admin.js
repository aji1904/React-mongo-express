const { Schema, model } = require('mongoose')

const AdminSchema = new Schema({
	username: String,
	password: String,
	status: String,
	email : String,
	notelp : String,
},{ versionKey: false })

module.exports = model('Admin', AdminSchema)
