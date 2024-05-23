const express = require('express');
const path = require('path');
const routes = require('./routes/data');

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Register routes
app.use('/data', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
