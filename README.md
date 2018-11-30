# **OpenTab**

OpenTab is a web application for tracking and settling rounds between friends.

<<<<<<< HEAD
<img src="https://www.dropbox.com/s/250nu4wjpyis1f8/login%20existing.png?raw=1" width="250">
<img src="https://www.dropbox.com/s/nh7dkgvgkvdc1vb/new%20tab%20even.png?raw=1" width="250">
<img src="https://www.dropbox.com/s/rdg79n0mlj2njxe/balances.png?raw=1" width="250">
=======
<p float="left">
  <img src="https://www.dropbox.com/s/250nu4wjpyis1f8/login%20existing.png?raw=1" width="250">
  <img src="https://www.dropbox.com/s/nh7dkgvgkvdc1vb/new%20tab%20even.png?raw=1" width="250">
  <img src="https://www.dropbox.com/s/rdg79n0mlj2njxe/balances.png?raw=1" width="250">
</p>
>>>>>>> ca8d58237bba217857b7776eba3da07aa000b6c3

## The Team:

- Yetkin Ergun
- David Gridley
- Tony Batty
- Luke Sikuade
- Daniel Geraghty

## Summary

Sometimes it can be difficult to track who owes what to who when buying rounds of drinks (alcoholic or otherwise), or splitting bills. OpenTab aims to provide an easy means of tracking and displaying what is owed between friends.

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

## Installation

- Fork and clone this repo.
- Run `npm install` to install dependencies.
- Create a `.env` file to store your database credentials.
- Create a local database using the supplied queries in [database.sql](database.sql).
- Run `npm start` to run the Node server with Nodemon.
- Run `npm run dev` to create a development build with webpack.

- This app was built with mobile-use in mind, it is advised that browser dev tools are used to replicate a mobile browser window.

**Tests**

- Run `npm test` to execute the test suite.

**Heroku**

- http://team-open-tab.herokuapp.com/

* Currently there are some issues with Heroku leading to H12 timeout errors, we are looking to correct this as soon as possible. If you want to see the app running live, but Heroku is giving an application error, please inform one of the team so we can reset the dynos.

## Features

- Create a user account, find your friends, family and collegues and add them to your contacts.

- When you go for your next coffee, grab a drink after work or get lunch with your friends, open
  a tab and add those involved

- Enter the name of your tab and the total amount of the order

- Work out your split: split evenly to divide the bill equally amongst your group, or split manually if paying individually seems fairer

- View your previous tabs, including those that have been ordered for you, and reorder that tab when it's your turn to get the drinks

- When it's time to settle up with your contacts, the person who has been paid can mark their tab as paid and reset their balance with the contact to zero

## Questions / Comments?

- Let us know by opening an issue on GitHub!
