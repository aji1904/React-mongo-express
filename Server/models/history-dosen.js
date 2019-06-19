const { Schema,model } = require('mongoose')

const historydosenSchema = new Schema({
    dosen : String,
    kelas : String,
    ruangan : String,
    tanggal : String,
}, {versionKey: false})

module.exports = model('historydosen', historydosenSchema)

