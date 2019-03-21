const express = require('express');

const Users = require('../helpers/userDb.js');

const usersRouter = express.Router();


usersRouter.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: "Could not retrieve users." });
    }
});


usersRouter.post('/', async (req, res) => {
    try {
        const newUser = await Users.insert(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "User could not be added." });
    }
});


usersRouter.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const count = await Users.remove(req.params.id);
        console.log(count);
        if(count > 0){
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: "User does not exist." });
        }

    } catch (error) {
        res.status(500).json({ message: "User could not be removed." });
    }
});


usersRouter.put('/:id', async(req, res) => {
    try {
        const count = await Users.update(req.params.id, req.body);
        res.status(200).json(count);

    } catch (error) {
        res.status(500).json({ message: "User could not be updated." });
    }
})

module.exports = usersRouter;