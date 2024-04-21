const express = require('express')
const router = express.Router()
const itemRoutes = require('./itemRoutes')
const reservationRoutes = require('./reservationRoutes')

router.use('/api/v2', itemRoutes)
router.use('/api/v2', reservationRoutes)

module.exports = router
