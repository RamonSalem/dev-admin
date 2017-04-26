const express = require('express');
const app     = express();
const chalk   = require('chalk');
const passport = require('passport');

const taskRoutes = require('./task/task.routes');
const clientRoutes = require('./client/client.routes');
const employeeRoutes = require('./employee/employee.routes');
const postRoutes = require('./post/post.routes');
const systemRoutes = require('./system/system.routes');

const mongoose =   require('mongoose');
const db   =   require('../config/db.connect').connect();

//
// mongoose.connect(db.database , (err) => {
// 	console.log("Establishing Connection with the database...");
// 	if (err) {
// 		console.log(chalk.red('✗')+" Connection with database failed!");
// 	}
// 	else{
// 		console.log(chalk.green('✓')+" Connection with the database established...");
// 	}
// });

const requireAuth = passport.authenticate('jwt', {session: false})

app.use('/tasks', taskRoutes);
app.use('/', clientRoutes);
app.use('/', employeeRoutes);
app.use('/', postRoutes);
app.use('/', systemRoutes);

module.exports = app;
