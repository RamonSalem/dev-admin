const express = require('express');
const app = express();

const Ddos = require('ddos')
const logger = require('morgan');
const chalk = require('chalk');
//const socket = require('./app/utils/socket');
const config = require('config');

const bodyParser= require('body-parser');
const cookieSession = require('cookie-session');


const cors = require('cors');

var server = require('./src/');

var ddos = new Ddos({burst: 15, maxcount:40});
app.use(ddos.express);
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.use(cookieSession({
  name: 'sessions',
  keys: ['key1', 'key2'],
  maxAge: 20000
}))

app.use(cors());
// app.use(logger('common'));
//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(logger('combined')); //'combined' outputs the Apache style LOGs
}
app.use('/',server);

const serverIO = app.listen(process.env.PORT || 3000 ,()=>{
	console.log(chalk.green('✓')+' running on port 3000');
})

module.exports = app; // for testing
/*
const socketIO = require('socket.io');
const io = socketIO(serverIO);
socket.init(io);

*/
