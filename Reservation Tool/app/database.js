const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database/database.db')

function getItemsFromDatabase(callback) {
  const sql = 'SELECT * FROM items'

  db.all(sql, (error, rows) => {
    if (error) {
      callback(error)
    } else {
      callback(null, rows)
    }
  })
}

function getItemDetailsFromDatabase(id, callback) {
  const sql = 'SELECT * FROM items WHERE id = ?'

  db.get(sql, [id], (error, row) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, row)
    }
  })
}

function getAllReservationsFromDatabase(callback) {
  const today = new Date().toISOString().split('T')[0]
  const sql = `
    SELECT reservations.*, items.name AS item_name
    FROM reservations
    INNER JOIN items ON reservations.item = items.id
    WHERE reservation_date >= ?
    ORDER BY reservation_date ASC, 
             TIME(SUBSTR(reservation_time, 1, 2) || ':' || SUBSTR(reservation_time, 4, 2)) ASC
  `

  db.all(sql, [today], (error, rows) => {
    if (error) {
      callback(error)
    } else {
      callback(null, rows)
    }
  })
}

function getItemReservationsFromDatabase(id, callback) {
  const sql = 'SELECT * FROM reservations WHERE item = ?'

  db.all(sql, [id], (error, reservations) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, reservations)
    }
  })
}

function saveReservationToDatabase(reservationData, callback) {
  const { id, date, time, name } = reservationData
  const sql = 'INSERT INTO reservations (item, name, reservation_date, reservation_time) VALUES (?, ?, ?, ?)'
  const values = [id, name, date, time]

  db.run(sql, values, callback)
}

module.exports = {
  getItemsFromDatabase,
  getItemDetailsFromDatabase,
  getAllReservationsFromDatabase,
  getItemReservationsFromDatabase,
  saveReservationToDatabase,
}
