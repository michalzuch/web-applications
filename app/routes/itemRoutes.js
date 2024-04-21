const express = require('express')
const router = express.Router()

const { createItem, getItemsList, getItem, updateItem, deleteItem } = require('../controllers/itemController')

router.post('/items', async (req, res) => {
  const itemData = req.body
  try {
    const newItem = await createItem(itemData)
    res.send(newItem)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/items', async (_, res) => {
  try {
    const items = await getItemsList()
    res.send(items)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/items/:id', async (req, res) => {
  const id = req.params.id
  try {
    const item = await getItem(id)
    res.send(item)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.put('/items/:id', async (req, res) => {
  const id = req.params.id
  const itemData = req.body
  try {
    const updatedItem = await updateItem(id, itemData)
    if (updateItem) {
      res.send(updatedItem)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete('/items/:id', async (req, res) => {
  const id = req.params.id
  try {
    const deletedItem = await deleteItem(id)
    if (deletedItem) {
      res.send(deletedItem)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router
