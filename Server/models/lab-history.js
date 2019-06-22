const { Schema,model } = require('mongoose')

const LabSchema = new Schema({
    nim : String,
    nama : String,
    kelas : String,
    waktuMulai : String,
    waktuSelesai : String,
    tanggal : String,
    namaDosen : String,
   	pelajaran : String,
    ruangan : String,
    lamaPinjam : String,
}, {versionKey: false})

module.exports = model('lab', LabSchema)


	//nim, nama, kelas, dosen, lama pinjam, ruangan, jam mulai, jam selesai
