const express = require('express')
const router = express.Router()
const {getUsers, addUser, deleteUser, editUser} = require('../controllers/user-controller')

router.get('/users', getUsers)
router.post('/users', addUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', editUser)

module.exports = router


