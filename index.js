const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res, next) => {
    // Aqui es el POST, donde resivirre tu fakin JSON a este link: http://localhost/
    res.json("puto")
})
app.get('/', (req, res) => {
    // Esto es lo que te enviare si me haces una peticion GET gei!
    res.send('enviame JSON hijo de perra')
})

app.listen('3000', () => {
    console.log('Servidor en puerto: 3000');
})