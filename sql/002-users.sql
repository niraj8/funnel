CREATE TABLE users(
	_created TIMESTAMP default current_timestamp,
	_modified TIMESTAMP default current_timestamp,
	id TEXT PRIMARY KEY,
	hash TEXT NOT NULL,
	token TEXT,
	fname TEXT,
	lname TEXT
);
