const router = require('express').Router()

const connection = require('../service/dataBase')

router.post('/crearTinaco', (req, res) => {
    const echo = req.body
    const sql = `
    INSERT INTO tinaco (id,nombre)
    VALUES (?,?)
    `
    connection.query(sql,[echo.id,echo.nombre],(err, rows)=>{
        if (err) {
            console.log(err.sqlMessage);
            res.send(sqlMessage)
            return
        }else{
            res.send('Tinaco creado!.')
        }
    })
})

router.post('/iskeyOpen',(req,res)=>{
    var emp = req.body
    var sql = `
    SELECT * FROM llaveAbierta WHERE id_tinaco = ? 
    `
    connection.query(sql,[emp.id_tinaco],(err,results)=>{
        if (err) {
            console.log(err.sqlMessage)
            res.send('Ups! hubo un error.')
        }else{
            if (results[0].abierto === true) {
                res.send('abierta')
            }else if (results[0].abierto === false) {
                res.send('cerrada')
            }
        }
    })
})

router.post('/openKey',(req,res)=>{
    var emp = req.body
    var sql = `
    UPDATE llaveAbierta SET abierto = true WHERE id_tinaco = ? 
    `
    connection.query(sql,[emp.id_tinaco],(err,results)=>{
        if (err) {
            console.log(err.sqlMessage)
            res.send('Ups! hubo un error.')
        }else{
            console.log(results[0])
            res.send('Se esta abriendo la llave...')
        }
    })
})

router.post('/closeKey',(req,res)=>{
    var emp = req.body
    var sql = `
    UPDATE llaveAbierta SET abierto = false WHERE id_tinaco = ? ;
    `
    connection.query(sql,[emp.id_tinaco],(err,results)=>{
        if (err) {
            console.log(err.sqlMessage)
            res.send('Ups! hubo un error.')
        }else{
            console.log(results[0])
            res.send('Se esta cerrando la llave...')
        }
    })
})

module.exports = router