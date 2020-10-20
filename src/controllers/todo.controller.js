const asyncWrapper = require("../middlewares/async");
const {
  getAllTodosFromDB,
  insertNewTodoIntoDB,
  insertUpdatedTodoIntoDB,
  deleteTodoFromDB,
} = require("../db/api/todos");

const getTodos = asyncWrapper(async (req, res) => {
  const todos = await getAllTodosFromDB();
  res.send(todos);
});

const createTodo = asyncWrapper(async (req, res) => {
  const todo = { ...req.body };

  const response = await insertNewTodoIntoDB(todo);
  res.send(response);
});

const updateTodo = asyncWrapper(async (req, res) => {
  const response = await insertUpdatedTodoIntoDB(req.params.id, req.body);
  res.send(response);
});

const deleteTodo = asyncWrapper(async (req, res) => {
  const user = await deleteTodoFromDB(req.params.id);
  res.send(user);
});

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
