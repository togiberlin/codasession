# CodaSession
![Remote work](http://i.imgur.com/6jxMK1n.png)

In simple words, CodaSession is like GoogleDocs for programmers.
It allows you to work collaboratively on code with fellow engineers - no matter
where you live. For communication, CodaSession allows users to use a chat window.
Furthermore, it is very easy to exchange ideas via integrated video calls.

> CodaSession is meant to reduce barriers for effective remote work.

This private project is meant to be an exercise on WebSockets and real-time
page updates.

## Purpose
[Description TBD] Open source as the dominating factor for software innovation; however, distributed software development comes with communication challenges - how to cope with them?[/description TBD]

What problems this web platform solves:
- Conduct real-time remote **pair programming** sessions
- Conduct real-time remote **tutoring** sessions
- Conduct real-time remote **coding interviews**

## Technology Stack
- [Node.js](https://nodejs.org/en/) server side platform
- [Express.js](http://expressjs.com/) web framework
- [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database
- [Mongoose](http://mongoosejs.com/) Object-relational mapper
- [Handlebars](http://handlebarsjs.com/) HTML templating language
- [Bootstrap](http://getbootstrap.com/) ready-to-use HTML and CSS component kit

## Prerequisites
- Install a [Node Version Manager (NVM)](https://github.com/creationix/nvm)
- Download and install Node.js from [here](https://nodejs.org/en/)
- Alternatively, you can download and install Node.js via ```$ nvm install 8.1.3``` Note: as of July 2017, 8.1.3 is the latest Node.js version.
- Install [MongoDB](https://www.mongodb.com/) via [Homebrew](https://brew.sh/) ```$ brew install mongodb```
- Download and install [Robo 3T](https://robomongo.org/) GUI for exploring the database content

## Setup
- Run ```$ npm install``` to install all dependencies
- Run ```$ npm start``` to start the web server
- Run ```$ sudo mongod``` to start the NoSQL database
- Open your web browser and go to ```localhost:3000```

## Deployment
[Deployment to Heroku TBD]
