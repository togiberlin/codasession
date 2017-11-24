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
- Open now the Robo 3T application, and create a MongoDB database. Enter your database configuration settings under ```config.js:11```.

## Setup
- Run ```$ npm install``` to install all dependencies
- Run ```$ npm start``` to start the web server
- Run ```$ sudo mongod``` to start the NoSQL database
- Voilà! Open your web browser and go to ```localhost:3000```.

## Deployment
### Preparatory Steps
- If you haven't done so yet, download or fork this repository. Make sure, that this repo is tracked by Git.
- Make sure to have a [Heroku account](https://www.heroku.com)
- Install Heroku CLI via Homebrew ```$ brew install heroku```
- Make sure, that you have a MongoDB database hosting service ready. You can register for a (free) account at e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [mLab](https://mlab.com/mlab-vs-atlas/), [A2 Hosting](https://www.a2hosting.com/), [Vultr](https://www.vultr.com/), [Compose](https://www.compose.com/) and so on.

### Modifying Local Files
- Configure the GMail mailer service and Facebook-login under ```config.js```
- Replace the ```dbConnString``` inside the ```config.js:12```. It should be similar to e.g. ```mongodb://<dbuser>:<dbpassword>@abc12345.mlab.com:21336/codasession```.
- The ```http``` protocol can't access your webcam, it therefore has to be ```https``` instead. Go to ```views/session.hbs:55```. Replace the link with this: ```https://raw.githubusercontent.com/peers/peerjs/master/lib/peer.js```. Alternatively, you can upload the ```peer.js``` file to your own, custom ```https``` server like e.g. Heroku.
- In ```views/session.hbs:64```, remove the link so that it appears like this: ```var socket = io.connect();```. Socket.io will now determine automatically the environment.
- In ```views/session.hbs:122-128``` uncomment all lines. Update the ```key```.

### Going Online
- Type into the command line ```$ heroku login```. Enter your Heroku account data.
- Type ```$ heroku create``` to create an app.
- Type ```$ git push heroku master``` to upload this Git repo to Heroku.
- Copy/paste the visible Heroku link into your browser. Voilà, the app is now online!

### Making the Mailer Form and FB Login Work
- To make the mailer form work, go to [https://accounts.google.com/b/0/DisplayUnlockCaptcha](https://accounts.google.com/b/0/DisplayUnlockCaptcha) and confirm.
- On [developers.facebook.com](https://developers.facebook.com), make sure to 1. whitelist the Heroku link and 2. make your FB app public and 3. add the Heroku link as a valid OAuth redirect URI.
- Replace ```config.js:18```,  with your Heroku link, which looks similar to this ```https://example-12345.herokuapp.com/auth/facebook/callback```
- Redeploy via ```$ git push heroku master```
