const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',require('./routes/login').router)
app.use('/api',require('./routes/register'))
app.use('/api',require('./routes/Data'))
app.use('/api',require('./routes/tinaco'))
app.use('/api',require('./routes/index'))
app.use('/api',require('./routes/home'))

app.listen('3000', () => {
    console.log('Servidor en puerto: 3000');
})