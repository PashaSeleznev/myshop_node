const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-route')
const app = express()
require('dotenv').config()

const db = process.env.MONGO_URL

mongoose
    .connect(db)
    .then((res) => console.log('connected!'))
    .catch((error) => console.log(error))

app.use(cors())
app.use(express.json())
app.use(userRoutes)

app.listen(5000, () => { console.log("Server started") })