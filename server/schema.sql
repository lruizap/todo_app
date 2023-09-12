CREATE DATABASE todo_app;
USE todo_app;

-- Tabla de usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

-- Tabla de todos
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de compartir
CREATE TABLE shared_todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_id INT,
  user_id INT,
  shared_with_id INT,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Datos de Usuarios
INSERT INTO users (name, email, password) VALUES ('Juan', 'juanusuario@gmail.com', 'juanito1234');
INSERT INTO users (name, email, password) VALUES ('Hernesto', 'hernestousuario@gmail.com', 'hernesto1234');

-- Todos
INSERT INTO todos (title, user_id) VALUES
  ("🏃‍♀️ Go for a morning run 🌄", 1),
  ("🖱 Work on a project presentation 💻", 1),
  ("🛒 Go grocery shopping 🛍", 1),
  ("📚 Read 30 pages of book 📕", 1),
  ("🚲 Ride a bike to the park 🚵‍♂️", 1),
  ("🍽 Cook dinner for family 👩‍🍳", 1),
  ("🏓 Practice sports 🏈", 1),
  ("🧹 Clean the house 🧽", 1),
  ("💤 Get 8 hours of sleep 🛌", 1);

-- Compartir una nota con otro usuario
INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1,1,2);

-- Obtener notas incluidas las compartidas por id 
-- Seleccionamos todos los todos que ha creado el usuario y todos los que le han compartido
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = 1 OR shared_todos.shared_with_id = 1;