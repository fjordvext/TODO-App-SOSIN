const Todo = require('../models/Todo');

const todoController = {};

todoController.index = (req, res) => {
  Todo.findAll()
    .then(todo => {
      res.render('index', {
        message: 'ok',
        data: todo,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

todoController.show = (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      res.render('show', {
        message: 'ok',
        data: todo,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Not found!',
        error: err,
      });
    });
};

todoController.create = (req, res) => {
  console.log(req.body);
  Todo.create({
    task: req.body.task,
    status: req.body.status,
    category: req.body.category,
    importance: req.body.importance,
    completion: req.body.completion,
  }).then(todo => {
    res.json({
      message: 'Added successfully!',
      todo: todo,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Could not create successfully',
      error: err,
    });
  });
};

todoController.update = (req, res) => {
  Todo.update({
    task: req.body.task,
    status: req.body.status,
    category: req.body.category,
    importance: req.body.importance,
    completion: req.body.completion,
  }, req.params.id).then(todo => {
    res.json({
      message: 'Updated successfully!',
      todo: todo,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Update failed',
      error: err,
    });
  });
};

todoController.delete = (req, res) => {
  Todo.destroy(req.params.id)
    .then(() => {
      res.json({ message: 'Successfully deleted' });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Delete failed',
        error: err,
      });
    });
};

module.exports = todoController;
