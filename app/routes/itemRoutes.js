const express = require('express')
const router = express.Router()

const itemController = require('../controllers/itemController.js')
const reservationController = require('../controllers/reservationController.js')
const errors = require('../services/errors')

router.get('/', async (_, res) => {
  try {
    const rows = await itemController.getItemsList()
    res.render('index', { items: rows })
  } catch (error) {
    res.render('error', errors.error_500)
  }
})

router.get('/item/:id', async (req, res) => {
  const id = req.params.id
  try {
    const row = await itemController.getItemDetails(id)
    if (row) {
      const reservations = await reservationController.getItemReservations(id)
      res.render('item', { item: row, reservations: reservations })
    } else {
      res.render('error', errors.error_404)
    }
  } catch (error) {
    res.render('error', errors.error_500)
  }
})

module.exports = router
