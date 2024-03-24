const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()
const db = new sqlite3.Database('../database/database.db')
const port = 3000

const error_404 = { code: 404, message: 'Item not found' }
const error_500 = { code: 500, message: 'Internal server error' }

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  db.all('SELECT * FROM items', (error, rows) => {
    if (error) {
      res.render('error', error_500)
    } else {
      res.render('index', { items: rows })
    }
  })
})

app.get('/item/:id', (req, res) => {
  const id = req.params.id
  db.get('SELECT * FROM items WHERE id = ?', [id], (error, row) => {
    if (error) {
      res.render('error', error_500)
    } else if (row) {
      db.all('SELECT * FROM reservations WHERE item_id = ?', [id], (error, reservations) => {
        if (error) {
          res.render('error', error_500)
        } else {
          res.render('item', { item: row, reservations: reservations })
        }
      })
    } else {
      res.render('error', error_404)
    }
  })
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.post('/reservation', (req, res) => {
  console.log(req)
  const { id, date, time, name } = req.body
  const sql = 'INSERT INTO reservations (item_id, guest_name, reservation_date, reservation_time) VALUES (?, ?, ?, ?)'
  values = [id, name, date, time]

  db.run(sql, values, function (error) {
    if (error) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
