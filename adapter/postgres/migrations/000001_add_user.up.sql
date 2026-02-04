CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  username varchar(255) NOT NULL,

  created_at timestamptz NOT NULL DEFAULT(NOW()),
  updated_at timestamptz NULL
);

CREATE UNIQUE INDEX idx_users_email ON users (email);
CREATE UNIQUE INDEX idx_users_username ON users (username);

INSERT INTO users (name, email, username) VALUES('Rony Moura', 'ronymmoura@gmail.com', 'ronymmoura');
