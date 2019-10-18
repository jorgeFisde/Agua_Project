const router = require('express').Router()
const jwt = require('jsonwebtoken')

let connection = require('../service/dataBase')
let user = require('./login')

router.get('/home',user.verificacionToken,(req,res,next)=>{
    var sql = `
        SELECT * FROM tinaco,datos WHERE tinaco.id = datos.id_tinaco AND datos.id_usuario = ?
    `
    jwt.verify(req.token, 'my_secret_key', (err,data)=>{
        if (err) {
            res.send('Ups!, hubo un error')
            console.log(err)            
        }else{
            connection.query(sql,[data.usuario.id],(err,rows)=>{
                if (err) {
                    res.send('Ups!, ha ocurrido un error')
                    console.log(err.sqlMessage)                    
                }else{
                    data.usuario.tinaco = rows
                    console.log(data.usuario);
                    res.send(data.usuario)
                    
                }
            })
        }
    })
})
module.exports = router