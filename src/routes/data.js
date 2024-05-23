const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data');

router.get('/', dataController.getItems);
router.post('/', dataController.createItem);
router.put('/:id', dataController.updateItem);
router.delete('/:id', dataController.deleteItem);

module.exports = router;
