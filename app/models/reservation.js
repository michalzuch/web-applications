const { DataTypes } = require('sequelize')
const sequelize = require('../services/databaseSetup')

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

module.exports = { Reservation }
