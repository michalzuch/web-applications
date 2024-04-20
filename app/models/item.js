const { DataTypes } = require('sequelize')
const sequelize = require('../services/databaseSetup')
const { Reservation } = require('./reservation')

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
Item.hasMany(Reservation, { foreignKey: 'item' })
Reservation.belongsTo(Item, {
  foreignKey: {
    name: 'item',
    allowNull: false,
  },
})

module.exports = { Item }
