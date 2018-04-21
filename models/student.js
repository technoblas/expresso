'use strict';

const Datastore = require('nedb');

const student = new Datastore({
	filename: __dirname + '/../data/students.db',
	autoload: true
});

student.ensureIndex({ fieldName: 'email', unique: true });

module.exports = student;