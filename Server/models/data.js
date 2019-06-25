const { Schema,model } = require('mongoose')

const DataSchema = new Schema({
    field: String,
    nama: String,
    status_pintu: String,
    tanggal: String,
},{ versionKey: false })

module.exports = model('Lecture', LectureSchema)
