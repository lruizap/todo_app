import mysql from 'mysql2';
import dotenv from 'dotenv';

// Inicializar dotenv
dotenv.config();

// Creamos la conexión con la base de datos
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})
  .promise()

// Obtener las notas creadas por el usuario y las que han sido compartidas con él 
export async function getTodoByID(id) {
  const [rows] = await pool.query(
    `
    SELECT todos.*, shared_todos.shared_with_id
    FROM todos
    LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
    WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
  `,
    [id, id]
  );
  return rows;
}

// Obtener una nota por el id
export async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

// Obtener la nota compartida por la id
export async function getSharedTodoByID(id) {
  const [rows] = await pool.query(
    `SELECT * FROM shared_todos WHERE todo_id = ?`,
    [id]
  );
  return rows[0];
}

// Obtener el usuario por su id
export async function getUserByID(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

// Obtener el usuario por su email
export async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

// Crear una nota y recuperarla
export async function createTodo(user_id, title) {
  const [result] = await pool.query(
    `
    INSERT INTO todos (user_id, title)
    VALUES (?, ?)
  `,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
}

// Borrar una nota
export async function deleteTodo(id) {
  const [result] = await pool.query(
    `
    DELETE FROM todos WHERE id = ?;
    `,
    [id]
  );
  return result;
}

// Marcar como completado
export async function toggleCompleted(id, value) {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `
    UPDATE todos
    SET completed = ${newValue} 
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}

// Compartir la nota
export async function shareTodo(todo_id, user_id, shared_with_id) {
  const [result] = await pool.query(
    `
    INSERT INTO shared_todos (todo_id, user_id, shared_with_id) 
    VALUES (?, ?, ?);
    `,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
}