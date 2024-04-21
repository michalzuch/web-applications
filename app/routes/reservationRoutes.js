const express = require('express')
const router = express.Router()

const {
  createReservation,
  getReservationsList,
  getReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservationController.js')

router.post('/reservations', async (req, res) => {
  const reservationData = req.body
  try {
    const newReservation = await createReservation(reservationData)
    res.send(newReservation)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/reservations', async (_, res) => {
  try {
    const reservations = await getReservationsList()
    res.send(reservations)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/reservations/:id', async (req, res) => {
  const id = req.params.id
  try {
    const reservation = await getReservation(id)
    res.send(reservation)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.put('/reservations/:id', async (req, res) => {
  const id = req.params.id
  const reservationData = req.body
  try {
    const updatedReservation = await updateReservation(id, reservationData)
    if (updateReservation) {
      res.send(updatedReservation)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete('/reservations/:id', async (req, res) => {
  const id = req.params.id
  try {
    const deletedReservation = await deleteReservation(id)
    if (deletedReservation) {
      res.send(deletedReservation)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
