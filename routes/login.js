const router = require('express').Router()
const jwt = require('jsonwebtoken')

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
                //res.send('Bienvenido ' + rows[0].nombre)
                var usuario = rows[0]
                var token = jwt.sign({ usuario }, 'my_secret_key', { expiresIn: '1h' }, (err, token) => {
                    res.json({
                        token: token
                    })
                })
            } else {
                console.log(err.sqlMessage);
                res.send('Ups! algo salio mal, intentalo de nuevo mas tarde')
            }
        })
    } else {
        res.send('Email o contraseña incorrectos')
    }
})

function verificacionToken(req, res, next) {
    // cabexaera del portador que se envia al verificar token
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader);
    if (bearerHeader != undefined) {
        //separa en arreglos el string 
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }

}

module.exports = {
    router,
    verificacionToken
}