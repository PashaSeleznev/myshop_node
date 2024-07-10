const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-route')
const app = express()

const db = 'mongodb+srv://Pasha:Pashkodranichman17@cluster0.boxh6mh.mongodb.net/node-test?retryWrites=true&w=majority&appName=Cluster0'

mongoose
    .connect(db)
    .then((res) => console.log('connected!'))
    .catch((error) => console.log(error))

app.use(cors())
app.use(express.json())
app.use(userRoutes)

app.listen(5000, () => { console.log("Server started") })