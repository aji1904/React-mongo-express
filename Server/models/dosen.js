const { Schema,model } = require('mongoose')

const LectureSchema = new Schema({
    nip: String,
    password: String,
    nama: String,
    telepon: String,
    email: String,
},{ versionKey: false })

module.exports = model('Lecture', LectureSchema)

//nim, password, nama, status, telepon, email