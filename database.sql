CREATE DATABASE opentab;

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username varchar(30) NOT NULL,
  password text NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  phone varchar(20),
  avatar text
);

CREATE TABLE round (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name varchar(50) NOT NULL,
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

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  counterpart_id INT NOT NULL,
  round_id INT,
  amount NUMERIC(10,2) NOT NULL,
  type TEXT NOT NULL,
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user" (id),
  FOREIGN KEY (counterpart_id) REFERENCES "user" (id),
  FOREIGN KEY (round_id) REFERENCES round (id)
);

CREATE TABLE contact_user(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  contact_id INT NOT NULL,
  approved BOOLEAN NOT NULL,
  FOREIGN KEY(user_id) REFERENCES "user" (id),
  FOREIGN KEY(contact_id) REFERENCES "user" (id)
);

INSERT INTO "user" (username, password, email, phone, avatar) VALUES ('Yetkin', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'yetkin@gmail.com', '07998777666','https://avatars0.githubusercontent.com/u/42815334?s=400&v=4');
INSERT INTO "user" (username, password, email, phone, avatar) VALUES ('Dave', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'dave@gmail.com', '07998555444', 'https://avatars1.githubusercontent.com/u/42816100?s=400&v=4');
INSERT INTO "user" (username, password, email, phone, avatar) VALUES ('Dan', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'dan@gmail.com', '07998444333','https://avatars2.githubusercontent.com/u/38405106?s=400&v=4');
INSERT INTO "user" (username, password, email, phone, avatar) VALUES ('Tony', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'tony@gmail.com', '07998333222','https://avatars2.githubusercontent.com/u/42917940?s=400&v=4');
INSERT INTO "user" (username, password, email, phone, avatar) VALUES ('Luke', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'luke@gmail.com', '07998222111','https://avatars0.githubusercontent.com/u/40580944?s=400&v=4');

INSERT INTO contact_user(user_id, contact_id, approved) VALUES (1, 2, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (1, 3, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (1, 4, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (1, 5, true);

INSERT INTO contact_user(user_id, contact_id, approved) VALUES (2, 1, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (2, 3, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (2, 4, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (2, 5, true);

INSERT INTO contact_user(user_id, contact_id, approved) VALUES (3, 1, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (3, 2, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (3, 4, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (3, 5, true);

INSERT INTO contact_user(user_id, contact_id, approved) VALUES (4, 1, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (4, 2, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (4, 3, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (4, 5, true);

INSERT INTO contact_user(user_id, contact_id, approved) VALUES (5, 1, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (5, 2, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (5, 3, true);
INSERT INTO contact_user(user_id, contact_id, approved) VALUES (5, 4, true);
