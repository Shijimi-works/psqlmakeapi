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

//特定のユーサーを取得する
app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if(error) throw error;
        return result.status(200).json(results.rows);
    });
});

//ユーザーを追加する
app.post("/users", (req, res) => {
    const {name, email, age} = req.body;
    //ユーザーがすでに存在しているかどうか確認
    pool.query("SELECT s FROM users s WHERE s.email = $1",
    [email],
    (error, results) => {
        if(results.row.length) {
            return res.send("すでにユーザーが存在しています");
        }

        pool.query("INSERT INTO users(name, email, age) values($1, $2, $3)",
        [name, email, age],
        (error, results) => {
            if (error) throw error;
            res.status(201).send("ユーザー作成に成功しました");
        });
    });
});

//ユーザーを削除する
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if(error) throw error;

        const isUserExised = result.rows.length;
        if ( !isUserExised ) {
            return res.send("ユーザーが存在しません");
        }

        pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
            if(error) throw error;
            return res.status(200).send("削除に成功しました");
        });
    });
});

//ユーザーを更新する
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if(error) throw error;

        const isUserExised = result.rows.length;
        if ( !isUserExised ) {
            return res.send("ユーザーが存在しません");
        }

        pool.query("UPDATE users SET name = $1 WHERE id = $2",
        [name, id], (error, results) => {
            if(error) throw error;
            return res.status(200).send("更新に成功しました");
        });
    });
});

app.listen(PORT, () => {
    console.log("sever is running on port " + PORT);
});
