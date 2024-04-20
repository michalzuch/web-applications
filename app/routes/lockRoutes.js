const express = require('express')
const router = express.Router()

router.get('*', (_, res) => {
  res.redirect('/')
})

router.put('*', (_, res) => {
  res.sendStatus(405)
})

router.delete('*', (_, res) => {
  res.sendStatus(405)
})

router.post('*', (_, res) => {
  res.sendStatus(405)
})

module.exports = router
