const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/item', (req, res) => {
  res.render('item')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
