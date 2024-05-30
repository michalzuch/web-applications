const { Item } = require('../models/item.js')
const { Reservation } = require('../models/reservation.js')

async function createItem(itemData) {
  try {
    return await Item.create(itemData)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getItemsList() {
  try {
    return await Item.findAll()
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getItem(id) {
  try {
    return await Item.findByPk(id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function updateItem(id, itemData) {
  try {
    const item = await Item.findByPk(id)
    if (item) {
      await item.update(itemData)
      return item
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteItem(id) {
  try {
    const item = await Item.findByPk(id)
    if (item) {
      const associatedReservations = await Reservation.findAll({ where: { item: id } })

      if (associatedReservations.length > 0) {
        return 'Cannot delete item with associated reservations'
      }

      const deletedItem = item
      await item.destroy()
      return deletedItem
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = { createItem, getItemsList, getItem, updateItem, deleteItem }
