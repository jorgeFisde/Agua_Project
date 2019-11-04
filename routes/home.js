 const router  = require("express").Router()
 const jwt = require('jsonwebtoken')

 const connection = require('../service/dataBase')
 const user = require('./login')

 router.get("/home",user.verificacionToken,(req,res,next)=>{
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        if (err) {
            console.log('error al obtener el token: ') + err;
            res.send('Ups! hubor un problema en la autenticacion')
        }else{
            var sql = 'SELECT id_tinaco,nombre FROM datos,tinaco WHERE datos.id_tinaco = tinaco.id AND datos.id_usuario = ?'
            connection.query(sql,[data.usuario.id],(err,rows)=>{
                if (err) {
                    console.log(err.sqlMessage);
                    res.send('hubo un error a consultar la base de datos')
                }else{
                    res.json(rows)
                    console.log(rows);
                    
                }
            })
        }
    })
 })

 router.get("/home/porcentaje",user.verificacionToken,(req,res,next)=>{
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        if (err) {
            console.log('error al obtener el token: ') + err;
            res.send('Ups! hubor un problema en la autenticacion')
        }else{
            var sql = 'SELECT porcentaje FROM datos WHERE id_usuario = ?'
            connection.query(sql,[data.usuario.id],(err,rows)=>{
                if (err) {
                    console.log(err.sqlMessage);
                    res.send('hubo un error a consultar la base de datos')
                }else{
                    res.json(rows)
                    console.log(rows);
                    
                }
            })
        }
    })
 })

 module.exports = router