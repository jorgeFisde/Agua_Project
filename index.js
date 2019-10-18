const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',require('./routes/login').router)
app.use('/api',require('./routes/register'))
app.use('/api',require('./routes/sendDatos'))
app.use('/api',require('./routes/tinaco'))

app.listen('3000', () => {
    console.log('Servidor en puerto: 3000');
})