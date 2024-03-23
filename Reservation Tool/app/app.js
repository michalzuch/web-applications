const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const db = new sqlite3.Database('../database/database.db')
const port = 3000

const error_404 = { code: 404, message: 'Item not found' }
const error_500 = { code: 500, message: 'Internal server error' }

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

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
      res.render('item', { item: row })
    } else {
      res.render('error', error_404)
    }
  })
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
