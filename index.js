const express = require('express')
const mongoose = require('mongoose')
const personRoutes = require('./routers/personRoutes')
require('dotenv').config()

const app = express()
const PORT = 3000

//Read JSON middleware
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

//Routers
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, world!'
  })
})

app.use('/person', personRoutes)

//Listing some PORT
mongoose.connect(process.env.MONGODB_LINK)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running port ${PORT}`))
  })
  .catch((error) => {
    console.error(error)
  })