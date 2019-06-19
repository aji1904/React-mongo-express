const { Schema, model } = require('mongoose')

const StudentSchema = new Schema({
	nim: String,
	password: String,
	nama: String,
	kelas: String,
	email: String,
},{ versionKey: false })

module.exports = model('Student', StudentSchema)
 
//nim, password, nama, kelas, status, email,telpon
