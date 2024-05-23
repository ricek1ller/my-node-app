const sql = require('mssql');

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

exports.getItems = async () => {
  try {
    const request = pool.request();
    return await request.query('SELECT * FROM Items');
  } catch (err) {
    console.error('Error retrieving items:', err);
    throw err;
  }
};

exports.createItem = async (name, value) => {
  try {
    const request = pool.request();
    request.input('name', sql.NVarChar, name);
    request.input('value', sql.NVarChar, value);
    await request.query('INSERT INTO Items (Name, Value) VALUES (@name, @value)');
  } catch (err) {
    console.error('Error creating item:', err);
    throw err;
  }
};

// updateItem and deleteItem functions...
