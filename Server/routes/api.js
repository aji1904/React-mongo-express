const { Router } = require('express')
const Admin = require('../models/admin')
const Student = require('../models/mahasiswa')
const Lecture = require('../models/dosen')
const Lab = require('../models/lab-history')
const historydosen = require('../models/history-dosen')
const Log_data = require('../models/data')
const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require ('nodemailer')


//buat akses admin
router.get('/admin',  async (req, res) => {
	const password = await bcrypt.hash( 'admin12345', 10 )
	const newAdmin = new Admin({
		username: 'admin12345',
		password: password,
		status: 'admin',
		email: 'admin12345@gmail.com',
		notelp: '081281121290'
	})
	try {
		await newAdmin.save()
		res.send('Save Admin Berhasil')
	} catch (err) {
		console.log('Save Admin gagal:', err)
		res.send('Save Admin Gagal')
	}
})

//buat token login
router.get('/data/user/:token', async (req, res) => {
	const data = jwt.verify(req.params.token, 'rahasia');
	if (data) {
		res.status(200).send(data)
	} else {
		res.status(401).send('Anda tidak terautentikasi')
	}
})

//data history siswa
router.get('/data/histori/mahasiswa', async (req, res) => {
	const data = await Lab.find().sort({'_id':-1})

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
	} else {
		res.status(404).send('Data Belum Tersedia')
	}
})

//data history dosen
router.get('/data/histori/dosen', async (req, res) => {
	const data = await historydosen.find()

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
	} else {
		res.status(404).send('Data Belum Tersedia')
	}
})

//data log
router.post('/data/datalog', async ( req, res ) => { //menyimpan data
	
	const newData = new Log_data(req.body)
	try {
		await newData.save()
		console.log('save berhasil')
	} catch (error) {
		console.log('save gagal', error)
	}
})

//data lab
router.get('/data/data-log/lab', async (req, res) => { //untuk query arduino
	const dataLab = await Log_data.find().sort({'_id':-1}).limit(1)

	if (dataLab) {
		res.json({
			dataLab
		})

	} else {
		console.log('gagal')
	}
})

//buat user mahasiswa
router.post('/mahasiswa', async (req, res) => {
	const check = await Student.findOne({ nim: req.body.nim })
	if (check) {
		res.status(200).send('Data Mahasiswa Telah Tersedia')
		console.log('Gagal')
		return
	}else{
		req.body.password = bcrypt.hashSync( req.body.password , 10 )
		const newStudent = new Student(req.body)
		try {
			await newStudent.save()
			res.status(200).send('Data Mahasiswa Telah Ditambahkan')
			console.log('save berhasil')
		} catch (err) {
			console.log('save siswa gagal', err)
		}
	}
})


//buat user dosen
router.post('/dosen', async ( req, res ) => {	
	const check = await Lecture.findOne({ nip: req.body.nip })

	if (check) {
		res.status(200).send('Data Dosen Telah Tersedia !')
		console.log('Gagal')
		return
	} else {
		req.body.password = await bcrypt.hash( req.body.password, 10 )

		const newLecture = new Lecture(req.body)
		try {
			await newLecture.save()
			res.status(200).send('Data Dosen Telah Ditambahkan')
			console.log('save dosen berhasil')
		} catch (error) {
			console.log('save dosen gagal', err)
		}
	}
})

//data history dosen
router.post('/historydosen', async ( req, res ) => {
	const newhistorydosen = new historydosen(req.body)
	try {
		await newhistorydosen.save()
		res.status(200).send('Pintu LAB Telah Terbuka')
		console.log('save historydosen berhasil')
	} catch (error) {
		res.status(401).send('error')
		console.log('save history dosen gagal', err)
	}
})

//data lab
router.post('/lab', async ( req, res ) => {
	const newLab = new Lab(req.body)
	try {
		await newLab.save()
		res.status(200).send({pesan : 'Peminjaman LAB Selesai. Tunggu !!!'})
		console.log('save lab berhasil')
	} catch (error) {
		res.status(401).send({pesan : 'Peminjaman LAB Gagal.'})
		console.log('save lab gagal', err)
	}
})

//login authentication
router.post('/auth',  async (req, res) => {
	let model = null

	switch(req.body.role) {
		case 'admin':
			model = await Admin.findOne({ username: req.body.username })
			break;
		case 'dosen':
			model = await Lecture.findOne({ nip: req.body.nip })
			break;
		default:
			model = await Student.findOne({ nim: req.body.nim })
			break;
	}

	if (model) {
		const sukses = await bcrypt.compare(req.body.password, model.password)

		if (sukses) {
			delete model._doc.password
			const token = jwt.sign({ ...model._doc }, 'rahasia')
			res.status(200).send({
				token: token,
				pesan: 'Login Sukses'
			})
			return
		} else {
			res.status(401).send('Login Gagal, Password Anda salah!')
		}
	} else {
		res.status(401).send('Username Salah atau Tidak Terdaftar!')
	}
	res.end()
})

//notifikasi email siswa ke dosen
router.post('/emailsiswa', async(req, res) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		    user: 'mahasiswatekkom@gmail.com',
		    pass: 'AP12345!@#'
		}
	})
	const mailOptions = {
	  from: 'mahasiswatekkom@gmail.com', // sender address
	  to: req.body.email, // list of receivers
	  subject: 'Izin Akses Buka Pintu LAB 3', // Subject line
	  html: '<p>Assalamualaikum, Bapak/Ibu Dosen Pengajar. Saya '+req.body.nama +'('+req.body.kelas+') Ingin Meminta Izin Akses untuk Buka Ruang LAB 3</p>'// plain text body
	}
	transporter.sendMail(mailOptions, function (err, info) {
	   if(err)
	     console.log(err)
	   else
	     console.log('sukses')
	})
  	res.end('selesai')
})

//notifikasi tutup pintu dari siswa ke dosen
router.post('/tutupPintuSiswa', async(req, res) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		    user: 'mahasiswatekkom@gmail.com',
		    pass: 'AP12345!@#'
		}
	})
	const mailOptions = {
	  from: 'mahasiswatekkom@gmail.com', // sender address
	  to: req.body.email, // list of receivers
	  subject: 'Pintu LAB 3 Telah Terkunci', // Subject line
	  html: '<p>Assalamualaikum, Bapak/Ibu Dosen Pengajar. Saya '+req.body.nama +'('+req.body.kelas+') Telah Mengunci Ruang LAB 3</p>'// plain text body
	}
	transporter.sendMail(mailOptions, function (err, info) {
	   if(err)
	     console.log(err)
	   else
	     console.log('sukses')
	})
  	res.end('selesai')
})

//notifikasi email dosen ke siswa
router.post('/emaildosen', async(req, res) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		    user: 'dosentekkom@gmail.com',
		    pass: 'AP12345!@#'
		}
	})

	const mailOptions = {
	  from: 'dosentekkom@gmail.com', // sender address
	  to: req.body.email, // list of receivers
	  subject: 'Status Pintu ('+req.body.namaDosen+')' , // Subject line
	  html: '<p>Pintu LAB 3 Sudah terbuka, Silahkan Masuk</p>'// plain text body
	}

	transporter.sendMail(mailOptions, function (err, info) {
	   if(err)
	     console.log(err)
	   else
	     console.log('sukses')
	})
  	
  	res.end('selesai')
})

//notifikasi tutup pintu dari dosen ke siswa
router.post('/tutupPintuDosen', async(req, res) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		    user: 'dosentekkom@gmail.com',
		    pass: 'AP12345!@#'
		}
	})

	const mailOptions = {
	  from: 'dosentekkom@gmail.com', // sender address
	  to: req.body.email, // list of receivers
	  subject: 'LAB 3 Telah Terkunci ('+req.body.namaDosen+')' , // Subject line
	  html: '<p>Pintu LAB 3 Sudah Terkunci, Silahkan Keluar Dari LAB</p>'// plain text body
	}

	transporter.sendMail(mailOptions, function (err, info) {
	   if(err)
	     console.log(err)
	   else
	     console.log('sukses')
	})
  	
  	res.end('selesai')
})

//mengambil data dari siswa
router.get('/data/emailSiswa', async (req, res) => {
	const data = await Student.find().sort({'_id':-1})

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
	} else {
		res.status(404).send('Data Belum Tersedia')
	}

	res.end(data);
})

//mengambil data dari dosen
router.get('/data/emailDosen', async (req, res) => {
	const data = await Lecture.find().sort({'_id':-1})

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
		return
	} else {
		res.status(404).send('Data Belum Tersedia')
	}

	res.end(data);
})


router.get('/data/dataSiswa', async (req, res) => {
	const data = await Student.find()

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
		return
	} else {
		res.status(404).send('Data Belum Tersedia')
	}

	res.end(data);
})

router.get('/data/dataDosen', async (req, res) => {
	const data = await Lecture.find()

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
		return
	} else {
		res.status(404).send('Data Belum Tersedia')
	}
})

router.post('/data/deleteDosen', async (req, res) => {
	const data = await Lecture.deleteOne({nip : req.body.nip})

	if (data) {
		console.log('data terhapus')
		res.status(200).send('Data Dosen Telah Dihapus')
	} else {
		res.status(500).send('gagal')
	}
})

router.post('/data/deleteSiswa', async (req, res) => {
	const data = await Student.deleteOne({nim : req.body.nim})

	if (data) {
		console.log('data terhapus')
		res.status(200).send('Data Mahasiswa Telah Dihapus')
	} else {
		res.status(500).send('gagal')
	}
})


module.exports = router

