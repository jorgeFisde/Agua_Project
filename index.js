const express = require('express')
const mysql = require('mysql')
const app = express()

const connection = mysql.createConnection(
    {
        host: "database-1.c4xpddivvqgu.us-east-2.rds.amazonaws.com",
        port: "3306",
        user: "admin", 
        password: "kokielfd",
        database: "project_a"
    }
)

connection.connect((err)=>{
    if (err){
        console.log("hubo un error:", err);
        return
    }else{
        console.log("todo bien todo correcto");
        
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    // Aqui es el GET, donde resivirre tu fakin JSON a este link: http://localhost/
    res.send("puto")
    console.log('alguien me hizi GET');

})
app.post('/registrarse', (req, res) => {
    // Esto es lo que te enviare si me haces una peticion GET gei!
    const echo = req.body
    const sql = `INSERT INTO usuario (nombre,apellido,fecha_nacimiento,correo, contraseña) VALUES (?,?,?,?,?)`
    connection.query(sql,[echo.nombre,echo.apellido,echo.fecha_nacimiento,echo.correo,echo.contraseña],(err, rows)=>{
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage)
            return
        }else{
            res.send(rows[0])
        }
    })
})
app.post('/crearTinaco', (req, res) => {
    // Esto es lo que te enviare si me haces una peticion GET gei!
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
            res.json(rows)
        }
    })
})
app.post('/sendDatos', (req, res) => {
    // Esto es lo que te enviare si me haces una peticion GET gei!
    const echo = req.body
    const sql = `
    INSERT INTO datos (porcentaje,id_tinaco ,id_usuario)
    VALUES (?,?,?)
    `
    connection.query(sql,[echo.porcentaje,echo.id_tinaco, 1],(err, rows)=>{
        if (err) {
            console.log('**** AÑADIENDO DATOS AL SERVIDOR');
            console.log(echo.porcentaje + ' ' + echo.id_tinaco);
            
            console.log(err.sqlMessage);
            res.send(err.sqlMessage)
            return
        }else{
            res.send('datos mandados')
        }
    })
})


app.listen('3000', () => {
    console.log('Servidor en puerto: 3000');
})