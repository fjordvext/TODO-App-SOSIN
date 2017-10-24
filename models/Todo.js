const db = require('../db/config');

const Todo = {};

Todo.findAll = () => {
  return db.query('SELECT * FROM todo');
};

Todo.findById = (id) => {
  return db.oneOrNone(`
    SELECT *
    FROM todo
    WHERE id = $1
  `, [id]);
};

Todo.create = (todo) => {
  return db.one(`
    INSERT INTO todo
    (task, status, category, importance, comp)
    VALUES ($1, $2, $3, $4, 5$)
    RETURNING *
  `, [todo.task, todo.status, todo.category, todo.importance, todo.comp]);
};

Todo.update = (todo, id) => {
  return db.one(`
    UPDATE todo SET
    task = $1,
    status = $2,
    category = $3,
    importance = $4,
    comp = $5
    WHERE id = $6
    RETURNING *
  `, [todo.task, todo.status, todo.category, todo.importance, todo.comp, id]);
};

Todo.destroy = (id) => {
  return db.none(`
    DELETE FROM todo
    WHERE id = $1
  `, [id]);
};

module.exports = Todo;
