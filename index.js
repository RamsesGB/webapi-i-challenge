// implement your API here
const express = require('express');
const Users = require('./data/db');

const server = express();

// The C in CRUD
server.post('/api/users', (req, res) => {
  const userData = req.body;
  Users.insert(userData)
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The R in CRUD
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The U in CRUD
server.put('/api/users/:id', (req, res) => {

});

// The D in CRUD
server.delete('/api/users/:id', (req, res) => {

});

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'))
