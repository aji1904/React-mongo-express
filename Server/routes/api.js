const { Router } = require('express')
const Admin = require('../models/admin')
const Student = require('../models/mahasiswa')
const Lecture = require('../models/dosen')
const Lab = require('../models/lab-history')
const historydosen = require('../models/history-dosen')
const Log_data = require('../models/data')
const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.get('/admin',  async (req, res) => {

	const password = await bcrypt.hash( 'admin123', 10 )

	const newAdmin = new Admin({
		username: 'admin123',
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

router.get('/data/user/:token', async (req, res) => {
	const data = jwt.verify(req.params.token, 'rahasia');
	if (data) {
		res.status(200).send(data)
		return
	} else {
		res.status(401).send('Anda tidak terautentikasi')
	}
	res.end()
})

router.get('/data/histori/mahasiswa', async (req, res) => {
	const data = await Lab.find().sort({'_id':-1})

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
		return
	} else {
		res.status(200).send('Data Belum Tersedia')
	}
})

router.get('/data/histori/dosen', async (req, res) => {
	const data = await historydosen.find()

	if (data) {
		console.log('data ditemukan')
		res.status(200).send(data)
	} else {
		res.status(200).send('Data Belum Tersedia')
	}
})

router.post('/data/datalog', async ( req, res ) => { //menyimpan data
	
	const newData = new Log_data(req.body)
	try {
		await newData.save()
		console.log('save berhasil')
	} catch (error) {
		console.log('save gagal', error)
	}
})

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

router.post('/mahasiswa', async (req, res) => {
	const check = await Student.findOne({ nim: req.body.nim })

	if (check) {
		res.status(401).send('Data Mahasiswa Telah Tersedia')
		console.log('Gagal')
		return
	}else{
		req.body.password = bcrypt.hashSync( req.body.password , 10 )
		const newStudent = new Student(req.body)
		try {
			await newStudent.save()
			res.status(401).send('Data Mahasiswa Telah Ditambahkan')
			console.log('save berhasil')
		} catch (err) {
			console.log('save siswa gagal', err)
		}
	}
})

router.post('/dosen', async ( req, res ) => {	
	const check = await Lecture.findOne({ nip: req.body.nip })

	if (check) {
		res.status(401).send('Data Dosen Telah Tersedia !')
		console.log('Gagal')
		return
	} else {
		req.body.password = await bcrypt.hash( req.body.password, 10 )

		const newLecture = new Lecture(req.body)
		try {
			await newLecture.save()
			res.status(401).send('Data Dosen Telah Ditambahkan')
			console.log('save dosen berhasil')
		} catch (error) {
			console.log('save dosen gagal', err)
		}
	}
})

router.post('/historydosen', async ( req, res ) => {
	const newhistorydosen = new historydosen(req.body)
	try {
		await newhistorydosen.save()
		res.status(401).send('Pintu LAB Telah Terbuka')
		console.log('save historydosen berhasil')
	} catch (error) {
		res.status(401).send('Peminjaman LAB Selesai. Silahkan Tunggu')
		console.log('save history dosen gagal', err)
	}
})

router.post('/lab', async ( req, res ) => {
	
	const newLab = new Lab(req.body)
	try {
		await newLab.save()
		res.status(401).send('Peminjaman LAB Selesai. Silahkan Tunggu')
		console.log('save lab berhasil')
	} catch (error) {
		res.status(401).send('Peminjaman LAB Gagal.')
		console.log('save lab gagal', err)
	}
})


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


module.exports = router

