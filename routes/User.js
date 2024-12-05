const express = require('express')
const userfind = express.Router()

const { userValue, ValuePost, ValueUpdate } = require('../controllers/UserController')

userfind.get('/users', userValue)
userfind.post('/users/post', ValuePost)
userfind.patch('/users', ValueUpdate)
userfind.delete('/users', ValueDelete)


module.exports = userfind


