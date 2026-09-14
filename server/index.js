const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const UserModel = require('./models/Users')

const app = express()
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/crud'
const port = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_URL || 'https://mern-crud-integration-6.onrender.com' }))
app.use(express.json())

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err.message))

app.get('/', (req, res) => {
UserModel.find()
.then(users => res.json(users))
.catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
const id = req.params.id
UserModel.findById(id)
.then(user => res.json(user))
.catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
const id = req.params.id
UserModel.findByIdAndUpdate(id, {
name: req.body.name,
email: req.body.email,
age: req.body.age
}, { new: true })
.then(user => res.json(user))
.catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
const id = req.params.id
UserModel.findByIdAndDelete(id)
.then(user => res.json(user))
.catch(err => res.json(err))
})

app.post('/createUser', (req, res) => {
UserModel.create(req.body)
.then(user => res.json(user))
.catch(err => res.json(err))
})

app.listen(port, () => {
console.log(`Server is running on port ${port}`)
})