const express = require( "express");
const pool = require("./db");
const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello Express")
});

//ユーザーの情報全てを取得する
app.get("/users", (req, res) => {
    pool.query("SELECT * FROM users", (error, result) => {
        if(error) throw error;
        return result.status(200).json(results.rows);
    });
});

app.listen(PORT, () => {
    console.log("sever is running on port " + PORT);
});
