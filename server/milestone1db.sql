CREATE DATABASE milestone1db;

CREATE TABLE business (
	business_id char(22),   
	name varchar,
	state char(2),
	city varchar,
    PRIMARY KEY (business_id)
);