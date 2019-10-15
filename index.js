const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes/login'))
app.use(require('./routes/register'))
app.use(require('./routes/sendDatos'))
app.use(require('./routes/tinaco'))

app.listen('3000', () => {
    console.log('Servidor en puerto: 3000');
})