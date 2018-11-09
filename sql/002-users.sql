CREATE TABLE users(
	_created TIMESTAMP default current_timestamp,
	_modified TIMESTAMP default current_timestamp,
	id TEXT PRIMARY KEY,
	hash TEXT NOT NULL,
	token TEXT,
	token_created TIMESTAMP default current_timestamp,
	fname TEXT,
	lname TEXT
);
