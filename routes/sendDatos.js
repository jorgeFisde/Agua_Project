const router = require('express').Router()

const connection = require('../service/dataBase')

router.post('/sendDatos', (req, res) => {
    const porcentaje = req.body.porcentaje
    const tinaco = req.body.id_tinaco
    const sql = `
    INSERT INTO datos (porcentaje,id_tinaco ,id_usuario)
    VALUES (?,?,?)
    `
    connection.query(sql, [porcentaje, tinaco, 1], (err, rows) => {
        if (err) {


            console.log(err.sqlMessage);
            res.send(err.sqlMessage)
            return
        } else {
            res.send('datos mandados')
            console.log('**** AÑADIENDO DATOS AL SERVIDOR');
            console.log(porcentaje + ' ' + tinaco);
        }
    })
})

module.exports = router