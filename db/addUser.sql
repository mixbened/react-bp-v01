INSERT INTO d_users (username, password) VALUES ($1, $2);
SELECT * FROM d_users WHERE username = $1;