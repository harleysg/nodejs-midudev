const express = require('express')
const app = express()
// -----------------
const pokemonJson = require('../sources/json/pikachu.json')
const PORT = process.env.PORT || 1234
// -----------------
app.disable('x-powered-by')
// ----------------- Middlelware * routes
app.use((req, res, next) => {
  const { method, headers } = req

  if (method !== 'POST') return next()
  if (headers['content-type'] !== 'application/json') return next()

  // solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la información en el req.body
    data.hello = 'world'
    req.body = data
    next()
  })
})
// ----------------- Middlelware home route
app.use('/', (req, res, next) => {
  console.log('👨‍🚀 ~ Middlelware home routes:')
  next()
})
// -----------------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hola' })
})
app.get('/pokemon/pikachu', (req, res) => {
  return res.send(pokemonJson)
})
// -----------------
app.post('/pokemon', (req, res) => {
  console.log('👨‍🚀 ~ app.post ~ req.body:', req.body)
  res.status(201).json(req.body)
})
// -----------------
app.use((req, res) => {
  res.status(404).send('<h1>Not found</h1>')
})
// -----------------
app.listen(PORT, () => {
  console.log('Listen port:', PORT)
})
