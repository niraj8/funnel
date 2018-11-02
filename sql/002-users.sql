CREATE TABLE users(
	_created TIMESTAMP default current_timestamp,
	_modified TIMESTAMP default current_timestamp,
	id SERIAL PRIMARY KEY,
	hash TEXT NOT NULL,
	visible BOOLEAN NOT NULL default true
);
