const database = require('../models/database');

exports.getItems = async (req, res) => {
  try {
    const result = await database.getItems();
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving items:', err);
    res.status(500).send('Error retrieving items');
  }
};

exports.createItem = async (req, res) => {
  const { name, value } = req.body;
  try {
    await database.createItem(name, value);
    res.status(201).send('Item created');
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).send('Error creating item');
  }
};

// updateItem and deleteItem controllers...
