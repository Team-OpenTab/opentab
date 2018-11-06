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
buyer_id INT NOT NULL,
time TIMESTAMP WITH TIME ZONE NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES "user" (id)
);

CREATE TABLE round_user (
id SERIAL PRIMARY KEY,
round_id INT NOT NULL,
recipient_id INT NOT NULL,
FOREIGN KEY (recipient_id) REFERENCES "user" (id),
FOREIGN KEY (round_id) REFERENCES round (id)
);

INSERT INTO "user" (username, password, email, phone) VALUES ('Yetkin', 'test', 'yetkin@gmail.com', '07998777666');
INSERT INTO "user" (username, password, email, phone) VALUES ('Dave', 'test', 'dave@gmail.com', '07998555444');
INSERT INTO "user" (username, password, email, phone) VALUES ('Dan', 'test', 'dan@gmail.com', '07998444333');
INSERT INTO "user" (username, password, email, phone) VALUES ('Tony', 'test', 'tony@gmail.com', '07998333222');
INSERT INTO "user" (username, password, email, phone) VALUES ('Luke', 'test', 'luke@gmail.com', '07998222111');