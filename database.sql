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

INSERT INTO "user" (username, password, email, phone) VALUES ('Yetkin', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'yetkin@gmail.com', '07998777666');
INSERT INTO "user" (username, password, email, phone) VALUES ('Dave', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'dave@gmail.com', '07998555444');
INSERT INTO "user" (username, password, email, phone) VALUES ('Dan', '$$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'dan@gmail.com', '07998444333');
INSERT INTO "user" (username, password, email, phone) VALUES ('Tony', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'tony@gmail.com', '07998333222');
INSERT INTO "user" (username, password, email, phone) VALUES ('Luke', '$2b$10$XAEMX1WihrziSl0urFWhcesKynW20wPUlC2r1cCIGDAV/F6Ipz4Hi', 'luke@gmail.com', '07998222111');

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

CREATE TABLE contact_user(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  contact_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES "user" (id),
  FOREIGN KEY(contact_id) REFERENCES "user" (id)
  );

  /* dummy */
INSERT INTO contact_user(user_id, contact_id) VALUES (1, 2);
INSERT INTO contact_user(user_id, contact_id) VALUES (1, 3);
INSERT INTO contact_user(user_id, contact_id) VALUES (1, 4);
INSERT INTO contact_user(user_id, contact_id) VALUES (1, 5);

INSERT INTO contact_user(user_id, contact_id) VALUES (2, 1);
INSERT INTO contact_user(user_id, contact_id) VALUES (2, 3);
INSERT INTO contact_user(user_id, contact_id) VALUES (2, 4);
INSERT INTO contact_user(user_id, contact_id) VALUES (2, 5);

INSERT INTO contact_user(user_id, contact_id) VALUES (3, 1);
INSERT INTO contact_user(user_id, contact_id) VALUES (3, 2);
INSERT INTO contact_user(user_id, contact_id) VALUES (3, 4);
INSERT INTO contact_user(user_id, contact_id) VALUES (3, 5);

INSERT INTO contact_user(user_id, contact_id) VALUES (4, 1);
INSERT INTO contact_user(user_id, contact_id) VALUES (4, 2);
INSERT INTO contact_user(user_id, contact_id) VALUES (4, 3);
INSERT INTO contact_user(user_id, contact_id) VALUES (4, 5);

INSERT INTO contact_user(user_id, contact_id) VALUES (5, 1);
INSERT INTO contact_user(user_id, contact_id) VALUES (5, 2);
INSERT INTO contact_user(user_id, contact_id) VALUES (5, 3);
INSERT INTO contact_user(user_id, contact_id) VALUES (5, 4);
