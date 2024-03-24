const express = require('express')
const router = express.Router()

const db = require('./database')
const errors = require('./errors')

router.get('/', (req, res) => {
  db.getItemsFromDatabase((error, rows) => {
    if (error) {
      res.render('error', errors.error_500)
    } else {
      res.render('index', { items: rows })
    }
  })
})

router.get('/item/:id', (req, res) => {
  const id = req.params.id
  db.getItemDetailsFromDatabase(id, (error, row) => {
    if (error) {
      res.render('error', errors.error_500)
    } else if (row) {
      db.getReservationsFromDatabase(id, (error, reservations) => {
        if (error) {
          res.render('error', errors.error_500)
        } else {
          res.render('item', { item: row, reservations: reservations })
        }
      })
    } else {
      res.render('error', errors.error_404)
    }
  })
})

router.post('/reservation', (req, res) => {
  db.saveReservationToDatabase(req.body, (error) => {
    if (error) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

router.get('*', (req, res) => {
  res.redirect('/')
})

router.put('*', (req, res) => {
  res.sendStatus(405)
})

router.delete('*', (req, res) => {
  res.sendStatus(405)
})

router.post('*', (req, res) => {
  res.sendStatus(405)
})

module.exports = router
