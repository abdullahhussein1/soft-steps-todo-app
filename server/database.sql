CREATE DATABASE perntodo ;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    note VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    pinned BOOLEAN DEFAULT FALSE,
    remind_date DATE ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
)

CREATE USER abdullah WITH PASSWORD 'ise';
ALTER ROLE abdullah SET client_encoding TO 'utf8';
ALTER ROLE abdullah SET default_transaction_isolation TO 'read committed';
ALTER ROLE abdullah SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE todoapp TO abdullah;

ALTER DATABASE todoapp OWNER TO abdullah;
ALTER TABLE todos OWNER TO abdullah;

CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE user_setting (
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255) DEFAULT "light",
    sort_by VARCHAR(255) DEFAULT "dateEdited",
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES user_account (id) ON DELETE CASCADE
)
