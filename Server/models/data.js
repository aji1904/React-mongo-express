const { Schema,model } = require('mongoose')

const DataSchema = new Schema({
    field: String,
    nama: String,
    status_pintu: String,
    tanggal: String,
    ruangan: String,
},{ versionKey: false })

module.exports = model('data_log', DataSchema)
