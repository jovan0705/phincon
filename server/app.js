require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router);

app.listen(PORT, () => {
    console.log(`app listening to http://localhost:${PORT}`)
})

module.exports = app