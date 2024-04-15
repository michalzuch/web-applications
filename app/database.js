const { Sequelize, DataTypes } = require('sequelize')
const { Op } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database/database.db',
})

const Item = sequelize.define(
  'Items',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    location: DataTypes.TEXT,
    description: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
)

const Reservation = sequelize.define(
  'Reservations',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    reservation_date: DataTypes.TEXT,
    reservation_time: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
)

Item.hasMany(Reservation, { foreignKey: 'item' })
Reservation.belongsTo(Item, {
  foreignKey: {
    name: 'item',
    allowNull: false,
  },
})

async function getItemsFromDatabase(callback) {
  try {
    const items = await Item.findAll()
    callback(null, items)
  } catch (error) {
    callback(error)
  }
}

async function getItemDetailsFromDatabase(id, callback) {
  try {
    const item = await Item.findByPk(id)
    callback(null, item)
  } catch (error) {
    callback(error, null)
  }
}

async function getAllReservationsFromDatabase(callback) {
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
    callback(null, reservations)
  } catch (error) {
    callback(error)
  }
}

async function getItemReservationsFromDatabase(id, callback) {
  try {
    const resrevations = await Reservation.findAll({
      where: {
        item: id,
      },
    })
    callback(null, resrevations)
  } catch (error) {
    callback(error, null)
  }
}

async function saveReservationToDatabase(reservationData, callback) {
  try {
    const reservation = await Reservation.create(reservationData)
    callback(null, reservation)
  } catch (error) {
    callback(error)
  }
}

module.exports = {
  getItemsFromDatabase,
  getItemDetailsFromDatabase,
  getAllReservationsFromDatabase,
  getItemReservationsFromDatabase,
  saveReservationToDatabase,
}
