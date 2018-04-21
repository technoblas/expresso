const express = require('express');
const router = express.Router();

// call student model
const STUDENT = require('../models/student.js');

// get all collections
router.get('/students', (req, res) => {
    STUDENT.find({}, (err, students) => {
        if (err) {
        	return res.status(400).json({ message: 'DB Error', error: err });
        }

        res.status(200).json({ data : students});
    });
});

// get student resource
router.get('/students/:id', (req, res) => {
	const id = req.params.id;

	STUDENT.findOne({ _id: id }, (err, student) => {
        if (err) {
        	return res.status(400).json({ message: 'DB Error', error: err });
        }

		if (student === null) {
			return res.status(404).json({ 
				message: 'Resource not found', 
				error: 'The requested resource could not be found'
			});
		}

		res.status(200).json({ data: student});
	});
});

// post new data
router.post('/students', (req, res) => {
	const postData = req.body;
	var error = [];

	// make use of validator js if can
	if (!postData.name) {
		error.push('The name is required');
	}

	if (!postData.email) {
		error.push('The email is required');
	}

	if (!postData.section) {
		error.push('The section is required');
	}

	if (!postData.phone) {
		error.push('The phone is required');
	}

	if (error.length > 0) {
		return res.status(422).json({ 
			message: 'The given data was invalid', 
			errors: error 
		});
	}

	// avoid mass assignment
	const data = {
		name: postData.name,
		email: postData.email,
		section: postData.section,
		phone: postData.phone
	};

	// insert new collection
    STUDENT.insert(data, (err, student) => {
      if (err) {
      	return res.status(400).json({ message: 'DB Error', error: err });
      }

      res.status(201).json({ data: student});
    });
});

// put resource data
router.put('/students/:id', (req, res) => {
	const id = req.params.id;
	const postData = req.body;
	var error = [];

	// make use of validator js if can
	if (!postData.name) {
		error.push('The name is required');
	}

	if (!postData.email) {
		error.push('The email is required');
	}

	if (!postData.section) {
		error.push('The section is required');
	}

	if (!postData.phone) {
		error.push('The phone is required');
	}

	if (error.length > 0) {
		return res.status(422).json({ 
			message: 'The given data was invalid', 
			errors: error 
		});
	}

	// avoid mass assignment
	const data = {
		name: postData.name,
		email: postData.email,
		section: postData.section,
		phone: postData.phone
	};

	// find first
	STUDENT.findOne({ _id: id }, (err, student) => {
        if (err) {
        	return res.status(400).json({ message: 'DB Error', error: err });
        }

		if (student === null) {
			return res.status(404).json({ 
				message: 'Resource not found', 
				error: 'The requested resource could not be found'
			});
		}

	    STUDENT.update({ _id: id }, data, (err, numReplaced) => {
	        if (err) {
	        	return res.status(400).json({ message: 'DB Error', error: err });
	        }

	        // return payload success here and the new num
	        data['_id'] = id
	        res.status(200).json({ data: data });
	    });
	});

});

// destroy resource data
router.delete('/students/:id', (req, res) => {
	const id = req.params.id;

	STUDENT.findOne({ _id: id }, (err, student) => {
        if (err) {
        	return res.status(400).json({ message: 'DB Error', error: err });
        }

		if (student === null) {
			return res.status(404).json({ 
				message: 'Resource not found', 
				error: 'The requested resource could not be found'
			});
		}

		STUDENT.remove({ _id: id }, {}, (err, doc) => {
	        if (err) {
	        	return res.status(400).json(err);
	        }

	        res.status(204).json('No Content');
		});
	});
});

module.exports = router