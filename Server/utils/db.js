import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootdh@^sh1n1",
    database: "flight"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
        console.log(err)
    } else {
        console.log("Connected")
    }
})

export default con;