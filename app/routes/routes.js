const express = require('express')
const router = express.Router()
const apiRoutes = require('./apiRoutes')
const frontendRoutes = require('./frontendRoutes')
const lockRoutes = require('./lockRoutes')

router.use('/', apiRoutes)
router.use('/', frontendRoutes)
router.use('/', lockRoutes)

module.exports = router
