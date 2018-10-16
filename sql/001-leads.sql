CREATE TABLE leads(
	_created TIMESTAMP default current_timestamp,
	_modified TIMESTAMP default current_timestamp,
	id SERIAL PRIMARY KEY,
	data JSON
);
