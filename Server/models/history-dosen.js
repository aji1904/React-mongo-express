const { Schema,model } = require('mongoose')

const historydosenSchema = new Schema({
	nip: String,
    dosen : String,
    kelas : String,
    ruangan : String,
    tanggal : String,
    lamaBuka: String,
}, {versionKey: false})

module.exports = model('historydosen', historydosenSchema)

