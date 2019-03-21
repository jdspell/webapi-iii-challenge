const express = require('express');
const postsRouter = require('./data/routers/postsRouter.js');
const usersRouter = require('./data/routers/usersRouter.js');

const server = express();

//custom middleware
function capitalizeRequest(req, res, next) {
    const { name } = req.body;
    if(name) {
        name.toUpperCase();
        req.body.name = name;
    }
    next();
}


server.use(express.json());
server.use(capitalizeRequest);
server.use('/posts', postsRouter);
server.use('/users', usersRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hello</h2>`);
});

module.exports = server;