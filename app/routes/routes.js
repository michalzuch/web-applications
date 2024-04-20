const express = require('express')
const router = express.Router()
const itemRoutes = require('./itemRoutes')
const reservationRoutes = require('./reservationRoutes')
const lockRoutes = require('./lockRoutes')

router.use('/', itemRoutes)
router.use('/', reservationRoutes)
router.use('/', lockRoutes)

module.exports = router
