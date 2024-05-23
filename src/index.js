const express = require('express');
const sql = require('mssql');
 
const app = express();
app.use(express.json());
 
const dbConfig = {
    user: 'bkhadka',
    password: '!QAZ1qaz@WSX2wsx',
    server: 'myvdbserver.database.windows.net',
    database: 'mydb',
    options: {
        encrypt: true, // For Azure SQL Database
        enableArithAbort: true,
    },
};
 
sql.connect(dbConfig)
    .then(pool => {
        if (pool.connected) {
            console.log('Connected to Azure SQL Database');
        }
    })
    .catch(err => console.error('Database connection failed:', err));
 
app.get('/items', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Items`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
 
app.post('/items', async (req, res) => {
    const { name, description } = req.body;
    try {
        await sql.query`INSERT INTO Items (Name, Description) VALUES (${name}, ${description})`;
        res.status(201).send('Item created');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
 
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await sql.query`UPDATE Items SET Name=${name}, Description=${description} WHERE Id=${id}`;
        res.send('Item updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
 
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM Items WHERE Id=${id}`;
        res.send('Item deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
