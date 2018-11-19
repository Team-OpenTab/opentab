# **OpenTab**

OpenTab is a web application for tracking and settling rounds between friends.

![login page](https://www.dropbox.com/s/y6kkud54r0wlv37/Screenshot%202018-11-19%2014.22.53.png?dl=1 "Login")
![open tab page](https://www.dropbox.com/s/uacs1oxht0m1crr/Screenshot%202018-11-19%2014.23.59.png?dl=1 "Open Tab")
![balances page](https://www.dropbox.com/s/x6bc3frzoiej7gj/Screenshot%202018-11-19%2014.25.12.png?dl=1 "Balances")

## The Team:

- Yetkin Ergun
- David Gridley
- Tony Batty
- Luke Sikuade
- Daniel Geraghty

## Summary

Sometimes it can be difficult to track who owes what to who when buying rounds of drinks (alcoholic or otherwise), or splitting bills. OpenTab aims to provide an easy means of tracking and displaying what is owed.

Bought a round of drinks for a group? Jump into OpenTab and create a round, attaching each member of the group as a contact. Let the app know how much you've paid, and both you and your friends will know how things stand.

Someone has to leave the party early? No problem, OpenTab retains the information allowing you to know that next time, the first round is on them.

## Technologies used

**Front End**

- React
- React-Redux
- SCSS
- Handlebars

**Back End**

- Node.js
- Express
- Bcrypt
- Socket.io
- Postgres

**Unit Testing**

- Jest

**Build**

- webpack

## Installastion

- Fork and clone this repo.
- Run `npm install` to install dependencies.
- Create a `.env` file to store your database credentials.
- Create a local database using the supplied queries in [database.sql](database.sql).
- Run `npm start` to to run the Node server with Nodemon.
- Run `npm run dev` to create a development build React with webpack.

**Tests**

- Run `npm test` to execute the test suite.

## Features
