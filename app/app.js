const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const apiRoutes = require('./routes/apiRoutes')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', apiRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
