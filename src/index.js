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
    encrypt: true,
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(dbConfig);
pool.connect()
  .then(() => {
    console.log('Connected to Azure SQL Database');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

app.get('/items', async (req, res) => {
  try {
    const request = pool.request();
    const result = await request.query('SELECT * FROM Items');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving items:', err);
    res.status(500).send('Error retrieving items');
  }
});

app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const request = pool.request();
    request.input('name', sql.NVarChar, name);
    request.input('description', sql.NVarChar, description);
    await request.query('INSERT INTO Items (Name, Description) VALUES (@name, @description)');
    res.status(201).send('Item created');
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).send('Error creating item');
  }
});

// Update and delete routes with parameterized queries...

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
