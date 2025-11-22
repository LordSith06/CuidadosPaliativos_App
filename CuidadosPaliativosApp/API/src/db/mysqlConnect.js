const mysql = require("mysql2/promise");


const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "admin123",
    database: "aulanode",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT NOW() AS now');
        console.log("resposta do banco: ", rows[0].now);
    } catch (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    }
}

testConnection();


module.exports = pool;