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
