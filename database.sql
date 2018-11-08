CREATE DATABASE opentab;

CREATE TABLE "user" (
id SERIAL PRIMARY KEY,
username varchar(30) NOT NULL,
password text NOT NULL,
email varchar(50) UNIQUE,
phone varchar(20)
);

CREATE TABLE round (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
time TIMESTAMP WITH TIME ZONE NOT NULL,
FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE round_user (

id SERIAL PRIMARY KEY,
round_id INT NOT NULL,
counterpart_id INT NOT NULL,
FOREIGN KEY (counterpart_id) REFERENCES "user" (id),
FOREIGN KEY (round_id) REFERENCES round (id)
);

INSERT INTO "user" (username, password, email, phone) VALUES ('Yetkin', '$2y$10$00mfVUwPB8oeO2RRrBfJ1eYceGYnpW/5Dd6qv343MlySx5dTIvg7a', 'yetkin@gmail.com', '07998777666');
INSERT INTO "user" (username, password, email, phone) VALUES ('Dave', '$2y$10$00mfVUwPB8oeO2RRrBfJ1eYceGYnpW/5Dd6qv343MlySx5dTIvg7a', 'dave@gmail.com', '07998555444');
INSERT INTO "user" (username, password, email, phone) VALUES ('Dan', '$2y$10$00mfVUwPB8oeO2RRrBfJ1eYceGYnpW/5Dd6qv343MlySx5dTIvg7a', 'dan@gmail.com', '07998444333');
INSERT INTO "user" (username, password, email, phone) VALUES ('Tony', '$2y$10$00mfVUwPB8oeO2RRrBfJ1eYceGYnpW/5Dd6qv343MlySx5dTIvg7a', 'tony@gmail.com', '07998333222');
INSERT INTO "user" (username, password, email, phone) VALUES ('Luke', '$2y$10$00mfVUwPB8oeO2RRrBfJ1eYceGYnpW/5Dd6qv343MlySx5dTIvg7a', 'luke@gmail.com', '07998222111');

CREATE TABLE transaction (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
counterpart_id INT NOT NULL,
round_id INT,
amount NUMERIC(6,2) NOT NULL,
type TEXT NOT NULL,
time TIMESTAMP WITH TIME ZONE NOT NULL,
FOREIGN KEY (user_id) REFERENCES "user" (id),
FOREIGN KEY (counterpart_id) REFERENCES "user" (id),
FOREIGN KEY (round_id) REFERENCES round (id)
);
