const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = require('./routes/student');

// author: cedrick blas (technoblas)

// express app
const app = express();

// attach to middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes here
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to Expresso API' });
});

app.use('/api', studentRouter);

// route 404 / method not found
app.get('*', (req, res) => {
	return res.status(404).json({ 
		message: 'Endpoint not found', 
		error: 'The requested endpoint could not be found'
	});
});

// error handler
app.use((err, req, res, next) => {
	res.status(500).send({ error: 'Something went wrong!'});
});

// server
app.listen(3000, () => 
	console.log('Title: Simple REST API using NodeJS, ExpressJS and NeDB\n' + 
		'Author: Cedrick Blas (technoblas)\n' + 'Expresso App listening on port 3000!')
);