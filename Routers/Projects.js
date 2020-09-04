const express = require('express');
const db = require('../data/helpers/projectModel')
const router = express.Router();
// const actionsRouter = require('./actions')

// router.use('/:id/actions', actionsRouter)
router.get('/', (req, res) => {
    db.get()
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(err => {
        res.status(500).json('cant retrieve projects', err)
      })
  });
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json('cant retrieve project', err)
    })
  });
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
      .then(num => {
        res.status(200).json({ message: `successfuly deleted, ${num}`})
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `could not delete project`, err })
      })
  });
  
  router.post('/', (req, res) => {
    db.insert(req.body)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not process new project", err})
    })
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    if (body.name && body.description) {
      db.update(id, body)
        .then(updateRes => {
          updateRes !== null
            ? res.status(200).json({ message: "Successfully Updated" })
            : res.status(400).json({ message: "Could not update user" })
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "unable to process update", err })
        })
    } else
      res.status(400).json({ errorMessage: "Please Provide Name and description" })
  
  });

  //middleware functions
function validateProjectId() {
  return function (req, res, next) {
    const userId = Number(req.params.user_id)
    db.get(userId)
      .then(project => {
        project ? next() : res.status(400).json({ message: "invalid user id" })
        
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "could not process request", err })
      }) 
  }
}
  
  module.exports = router;