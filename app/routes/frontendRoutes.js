const express = require('express')
const router = express.Router()
const { getItemsList, getItem } = require('../controllers/itemController')
const { error_404, error_500 } = require('../services/errors')
const { getReservationsList, createReservation } = require('../controllers/reservationController')
const {
  mapItemIdsToNames,
  filterReservationsByDate,
  filterReservationsByItem,
} = require('../services/reservationService')

router.get('/', async (_, res) => {
  try {
    const items = await getItemsList()
    res.render('index', { items: items })
  } catch (error) {
    res.render('error', error_500)
  }
})

router.get('/reservations', async (_, res) => {
  try {
    const reservations = await getReservationsList()
    const items = await getItemsList()

    const reservationsWithNames = await mapItemIdsToNames(reservations, items)
    const filteredReservations = await filterReservationsByDate(reservationsWithNames)

    res.render('reservations', { reservations: filteredReservations })
  } catch (error) {
    res.render('error', error_500)
  }
})

router.get('/item/:id', async (req, res) => {
  const id = req.params.id
  try {
    const item = await getItem(id)
    if (!item) {
      res.render('error', error_404)
      return
    }
    const reservations = await getReservationsList()
    const filteredReservations = await filterReservationsByItem(reservations, id)
    res.render('item', { item: item, reservations: filteredReservations })
  } catch (error) {
    res.render('error', error_500)
  }
})

router.post('/reservation', async (req, res) => {
  const reservationData = req.body
  try {
    await createReservation(reservationData)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router
