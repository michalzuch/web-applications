const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database/database.db')

function getItemsFromDatabase(callback) {
  db.all('SELECT * FROM items', (error, rows) => {
    if (error) {
      callback(error)
    } else {
      callback(null, rows)
    }
  })
}

function getItemDetailsFromDatabase(id, callback) {
  db.get('SELECT * FROM items WHERE id = ?', [id], (error, row) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, row)
    }
  })
}

function getReservationsFromDatabase(id, callback) {
  db.all('SELECT * FROM reservations WHERE item_id = ?', [id], (error, reservations) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, reservations)
    }
  })
}

function saveReservationToDatabase(reservationData, callback) {
  const { id, date, time, name } = reservationData
  const sql = 'INSERT INTO reservations (item_id, guest_name, reservation_date, reservation_time) VALUES (?, ?, ?, ?)'
  const values = [id, name, date, time]

  db.run(sql, values, callback)
}

module.exports = {
  getItemsFromDatabase,
  getItemDetailsFromDatabase,
  getReservationsFromDatabase,
  saveReservationToDatabase,
}
