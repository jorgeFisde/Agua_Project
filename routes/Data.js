const router = require('express').Router()
const jwt = require('jsonwebtoken')

const connection = require('../service/dataBase')
const user = require('./login')

router.post('/historial', (req, res) => {
    var distancia = req.body.distancia
    var tinaco = req.body.id_tinaco
    var porcentaje = 100 - (((parseFloat(distancia) - 2.5)) / 12) * 100
    const sql = `
    INSERT INTO historial (porcentaje,id_tinaco, now() ,id_usuario)
    VALUES (?,?,?)
    `
    if (distancia < 2.5) {

        console.log("100%");
        //lcd.setCursor(0,1);
        //lcd.print("100%");
        connection.query(sql, [porcentaje, tinaco, 1], (err, rows) => {
            if (err) {
                console.log(err.sqlMessage);
                res.send(err.sqlMessage)
                return
            } else {
                res.send('datos mandados')
                console.log('**** AÑADIENDO DATOS AL HISTORIAL EN EL SERVIDOR ****');
                console.log(porcentaje + ' ' + tinaco);
            }
        })

    } else if (distancia > 14) {

        console.log("0%");
        //lcd.setCursor(0,1);
        //lcd.print("0%");
        connection.query(sql, [porcentaje, tinaco, 1], (err, rows) => {
            if (err) {
                console.log(err.sqlMessage);
                res.send(err.sqlMessage)
                return
            } else {
                res.send('datos mandados')
                console.log('**** AÑADIENDO DATOS AL HISTORIAL EN EL SERVIDOR ****');
                console.log(porcentaje + ' ' + tinaco);
            }
        })
    } else {

        console.log(porcentaje);
        console.log("%");
        /*lcd.setCursor(0,1);
        lcd.print(porcentaje);
        lcd.print("%");*/
        connection.query(sql, [porcentaje, tinaco, 1], (err, rows) => {
            if (err) {
                console.log(err.sqlMessage);
                res.send(err.sqlMessage)
                return
            } else {
                res.send('datos mandados')
                console.log('**** AÑADIENDO DATOS AL HISTORIAL EN EL SERVIDOR ****');
                console.log(porcentaje + ' ' + tinaco);
            }
        })

    }

})

router.get('/historial', user.verificacionToken, (req, res, next) => {
    var sql = `
        SELECT * FROM historial WHERE id_usuario = ?
    `
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.send('Ups!, hubo un error a recibir tus datos')
            console.log(err)
        } else {
            connection.query(sql, [data.usuario.id], (err, rows) => {
                if (err) {
                    res.send('Ups!, hubo un error en la base de datos')
                    console.log(err.sqlMessage)
                } else {
                    res.send(rows)
                }
            })
        }
    })
})

router.post('/updateData', (req, res) => {
    var emp = req.body
    var sql = `
    UPDATE datos SET porcentaje = ?, id_usuario = ? WHERE id_tinaco = ?
    `
    var porcentaje = 100 - ((( parseFloat(emp.distancia) - 2.5)) / 12) * 100;

    if (distancia < 2.5) {
        connection.query(sql, [porcentaje, 1, emp.id_tinaco], (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
                res.send('Ups! ha ocurrido un error')
            } else {
                console.log('todo al cien: ' + result.sqlMessage)
                res.send('Datos Actualizados!')
            }
        })

        console.log("100%");
        //lcd.setCursor(0,1);
        //lcd.print("100%");

    } else if (distancia > 14) {
        connection.query(sql, [porcentaje, 1, emp.id_tinaco], (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
                res.send('Ups! ha ocurrido un error')
            } else {
                console.log('todo al cien: ' + result.sqlMessage)
                res.send('Datos Actualizados!')
            }
        })

        console.log("0%");
        //lcd.setCursor(0,1);
        //lcd.print("0%");
    } else {
        connection.query(sql, [porcentaje, 1, emp.id_tinaco], (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
                res.send('Ups! ha ocurrido un error')
            } else {
                console.log('todo al cien: ' + porcentaje)
                res.send('Datos Actualizados!')
            }
        })
       }
    
})

module.exports = router