const express = require('express');
const todoRoutes = express.Router();

const todoController = require('../controllers/pizza-controller');

todoRoutes.get('/', todoController.index);
todoRoutes.post('/', todoController.create);

todoRoutes.get('/:id', todoController.show);
todoRoutes.put('/:id', todoController.update);
todoRoutes.delete('/:id', todoController.delete);

module.exports = todoRoutes;
