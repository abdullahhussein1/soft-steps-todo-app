CREATE DATABASE perntodo ;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    note VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    pinned BOOLEAN DEFAULT FALSE,
    remind_date DATE ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
);

CREATE USER abdullah WITH PASSWORD 'ise';
ALTER ROLE abdullah SET client_encoding TO 'utf8';
ALTER ROLE abdullah SET default_transaction_isolation TO 'read committed';
ALTER ROLE abdullah SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE todoapp TO abdullah;

ALTER DATABASE todoapp OWNER TO abdullah;
ALTER TABLE todos OWNER TO abdullah;
