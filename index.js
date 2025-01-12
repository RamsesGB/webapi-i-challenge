// implement your API here
const express = require('express');
const Users = require('./data/db');

const server = express();

server.use(express.json()); // <--- To parse JSON into JS object that can be read in POST function

// The C in CRUD
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body; // Destructuring userData

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            'There was an error while saving the user to the database',
        });
      });
  }
});

// The R in CRUD
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' });
    });
});

// The U in CRUD
server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({
              message: 'The user with the specified ID does not exist.',
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The user information could not be modified.',
        });
      });
  }
});

// The D in CRUD
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      }
      else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'The user could not be removed' });
    })
});

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'))
