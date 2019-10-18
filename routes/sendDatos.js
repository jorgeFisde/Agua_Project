const router = require('express').Router()

const connection = require('../service/dataBase')

router.post('/historial', (req, res) => {
    var porcentaje = req.body.porcentaje
    var tinaco = req.body.id_tinaco
    var idUsuario = req.body.idUsuarioo
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

router.get('/historial',(req,res,next)=>{
    
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