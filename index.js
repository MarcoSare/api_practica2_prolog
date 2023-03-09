const express = require('express')
const app = express()
const port = 3000
const connection = require('./connection')
const area_routes = require('./routes/area_routes')

app.use(express.json())
app.use('/api/v1', area_routes)
app.get('/', (req, res) => res.send('Hola!'))
app.listen(port, "0.0.0.0",() => console.log(`Example app listening on port ${port} :)!`))