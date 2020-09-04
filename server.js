const express = require('express');
const helmet = require('helmet');
const server = express();
const projectRouter = require('./Routers/Projects')


//global Middleware
server.use(express.json());
server.use(helmet());
server.use(logger());
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>It's Working!!!</h2>`);
});


//logger middleware run as global
function logger() {
  return (req, res, next) => {
      console.log(`a ${req.method} request was made to ${req.url}`);

      next();
  };
}
module.exports = server;
