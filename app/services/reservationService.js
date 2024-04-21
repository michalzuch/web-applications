const { Op } = require('sequelize')
const sequelize = require('../services/databaseSetup')
const { Item } = require('../models/item')
const { Reservation } = require('../models/reservation')

async function getCurrentReservations() {
  const today = new Date().toISOString().split('T')[0]
  try {
    const reservations = await Reservation.findAll({
      include: {
        model: Item,
        attributes: ['name'],
      },
      raw: true,
      where: {
        reservation_date: {
          [Op.gte]: today,
        },
      },
      order: [
        ['reservation_date', 'ASC'],
        [sequelize.literal("TIME(SUBSTR(reservation_time, 1, 2) || ':' || SUBSTR(reservation_time, 4, 2))"), 'ASC'],
      ],
    })

    reservations.forEach((reservation) => {
      reservation.item_name = reservation['Item.name']
      delete reservation['Item.name']
    })
    return reservations
  } catch (error) {
    throw error
  }
}

async function getItemReservations(id) {
  try {
    return await Reservation.findAll({
      where: {
        item: id,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports = { getCurrentReservations, getItemReservations }
