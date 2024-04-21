const { Reservation } = require('../models/reservation')

async function createReservation(reservationData) {
  try {
    return await Reservation.create(reservationData)
  } catch (error) {
    throw error
  }
}

async function getReservationsList() {
  try {
    return await Reservation.findAll()
  } catch (error) {
    throw error
  }
}

async function getReservation(id) {
  try {
    return await Reservation.findByPk(id)
  } catch (error) {
    throw error
  }
}

async function updateReservation(id, reservationData) {
  try {
    const reservation = await Reservation.findByPk(id)
    if (reservation) {
      await reservation.update(reservationData)
      return reservation
    }
    return null
  } catch (error) {
    throw error
  }
}

async function deleteReservation(id) {
  try {
    const reservation = await Reservation.findByPk(id)
    if (reservation) {
      const deletedReservation = reservation
      await reservation.destroy()
      return deletedReservation
    }
    return null
  } catch (error) {
    throw error
  }
}

module.exports = { createReservation, getReservationsList, getReservation, updateReservation, deleteReservation }
