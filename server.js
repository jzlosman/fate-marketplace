// get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');
var multer = require('multer');

var config = require('config');

mongoose.connect(config.DBHost);

//for console logging in color
var chalk = require('chalk');

// create our application
var app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.json({
    limit:'4mb',
  extended:true
}));

app.use(session({
    secret: 'My V3ry Unique Session Key',
    saveUninitialized: true,
    resave: true
}));

app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/views/dev'));
app.use('/other_vendors', express.static(__dirname + '/views/src_/app/other_vendors'));


var port = process.env.PORT || 3000;

app.use(passport.initialize());

var router = express.Router();

router.route('/').get(function(req, res){
   res.render(__dirname + '/views/dev/index.ejs');
});

app.use('/', router);

/* API */
var prefix = '/api';

var usersRoute = require('./routes/user.routes');
app.use(prefix, usersRoute);

var clientsRoute = require('./routes/auth/client.routes');
app.use(prefix, clientsRoute);

var oauth2Route = require('./routes/auth/oauth2.routes');
app.use(prefix, oauth2Route);

var charactersRoute = require('./components/characters/characters.routes');
app.use(prefix, charactersRoute);

var storiesRoute = require('./components/stories/stories.routes');
app.use(prefix, storiesRoute);

var chaptersRoute = require('./components/chapters/chapters.routes');
app.use(prefix, chaptersRoute);

var settingsRoute = require('./components/settings/settings.routes');
app.use(prefix, settingsRoute);

var sessionsRoute = require('./components/sessions/sessions.routes');
app.use(prefix, sessionsRoute);

var locationsRoute = require('./components/locations/locations.routes');
app.use(prefix, locationsRoute);

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(port);
io.on('connection', function(socket){
    console.log(chalk.green("CONNECTED USER"));
  socket.on('message', function(msg){
    socket.broadcast.emit('message', msg);
    console.log(chalk.blue('MSG:')+" " + chalk.green(msg.text)+" by " + chalk.yellow(msg.owner.username))
  });
});
console.log('listening for beer on ' + port);

module.exports = server;