const express = require('express');
const cors = require('cors');

const db = require('./data/db')

const server = express();

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send("The following is a list of endpoints for full functionality: /api/users: post, /api/users: get, /api/users/:id: get, /api/users/:id: delete, /api/users/:id: put. Please use these in Postman or Insomnia.")
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(bananaword => {
        res.status(200).json(bananaword)
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "The users information could not be retrieved.",
            err
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    .then(userID => {
        if (userID) {
            res.status(200).json({success: true, userID});
        } else {
            res.status(404).json({
                success: false,
                message: "That User ID does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "The user information could not be retrieved",
            err
        })
    })
})

server.post('/api/users/', (req, res) => {
    const body = req.body;
    const {name} = req.body;
    const {bio} = req.body;
    if(!name) {
        res.status(422).json({message: "Missing fields, needs a name."})
    }
    if(!bio) {
        res.status(422).json({message: "Missing fields, needs a bio."})
    }
    console.log(body)
    db.insert(body)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "The server has failed to add the new user to the database.",
            err
        })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    console.log(id)
    db.remove(id)
    .then(removed => {
        if (removed) {
            res.status(204).json()
        } else {
            res.status(404).json({
                success: false,
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    const {name} = req.body;
    const {bio} = req.body;
    if(!name) {
        res.status(422).json({message: "Missing updated fields, needs a name."})
    }
    if(!bio) {
        res.status(422).json({message: "Missing updated fields, needs a bio."})
    }
    if(!id) {
        res.status(404).json({message: "User cannot be updated, user does not exist."})
    }
    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(500).json({message: "That user could not be updated"})
        }
    })
})

const port = 4000

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})