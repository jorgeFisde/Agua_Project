const router = require('express').Router()
const jwt = require('jsonwebtoken')

const connection = require('../service/dataBase')
const user = require('./login')

router.post('/historial',(req, res) => {
    var porcentaje = req.body.porcentaje
    var tinaco = req.body.id_tinaco
    var idUsuario = req.body.idUsuario
    const sql = `
    INSERT INTO historial (porcentaje,id_tinaco, now() ,id_usuario)
    VALUES (?,?,?)
    `
    connection.query(sql, [porcentaje, tinaco, idUsuario], (err, rows) => {
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
})

router.get('/historial',user.verificacionToken,(req,res,next)=>{
    var sql = `
        SELECT * FROM historial WHERE id_usuario = ?
    `
    jwt.verify(req.token, 'my_secret_key',(err,data)=>{
        if (err){
            res.send('Ups!, hubo un error a recibir tus datos')
            console.log(err)            
        }else{
            connection.query(sql,[data.usuario.id],(err,rows)=>{
                if (err) {
                    res.send('Ups!, hubo un error en la base de datos')
                    console.log(err.sqlMessage)                    
                }else  {
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
    connection.query(sql, [emp.porcentaje, emp.id_usuario, emp.id_tinaco], (err, result) => {
        if (err) {
            console.log(err.sqlMessage)
            res.send('Ups! ha ocurrido un error')
        } else {
            console.log('todo al cien: ' + result.sqlMessage)
            res.send('Datos Actualizados!')
        }
    })
})

module.exports = router