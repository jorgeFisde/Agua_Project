const router = require('express').Router()

const connection = require('../service/dataBase')

router.post('/login', (req, res) => {
    var emp = req.body
    var sql = `
    SELECT * FROM usuario WHERE email = ? AND contraseña = ?
    `
    if (emp.email && emp.contraseña) {
        connection.query(sql, [emp.email, emp.contraseña], (err, rows) => {
            if (rows.length > 0) {
                console.log(rows[0]);
                res.send('Bienvenido ' + rows[0].nombre)
            } else {
                console.log(err.sqlMessage);
                res.send('Ups! algo salio mal, intentalo de nuevo mas tarde')
            }
        })
    }else{
        res.send('Email o contraseña incorrectos')
    }
})

module.exports = router