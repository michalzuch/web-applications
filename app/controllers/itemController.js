const { Item } = require('../models/item.js')

async function getItemsList() {
  try {
    return await Item.findAll()
  } catch (error) {
    throw error
  }
}

async function getItemDetails(id) {
  try {
    return await Item.findByPk(id)
  } catch (error) {
    throw error
  }
}

module.exports = { getItemsList, getItemDetails }
