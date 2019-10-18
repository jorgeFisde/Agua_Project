const router = require('express').Router()

const connection = require('../service/dataBase')

router.post('/registrarse', (req, res) => {
    const echo = req.body
    const sql = `INSERT INTO usuario (nombre,apellido,fecha_nacimiento,email, contraseña) VALUES (?,?,?,?,?)`
    connection.query(sql,[echo.nombre,echo.apellido,echo.fecha_nacimiento,echo.email,echo.contraseña],(err, rows)=>{
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage)
            return
        }else{
            res.send('Registro exitoso!.')
        }
    })
})

module.exports = router