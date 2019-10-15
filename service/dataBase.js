const mysql = require('mysql')

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

module.exports = connection