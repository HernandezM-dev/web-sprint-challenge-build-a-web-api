const express = require('express');
const db = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel')
const router = express.Router({
    mergeParams: true
});


router.get('/', (req, res) => {
    // const id = req.params.project_id
    // console.log(req.params.id)
    db.get()
      .then(actions => {
        res.json(actions)
      })
      .catch(err => {
        res.status(500).json('cant retrieve actions')
      })
  });
  router.get('/:id', (req, res) => {
    // const id = req.params.id;
    db.get(req.params.id)
    .then(actions => {
    res.json(actions)
    })
    .catch(err => {
      res.status(500).json('cant retrieve actions', err)
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
  
  router.post('/', validateProjectId(), (req, res) => {
    db.insert(req.body)
    .then(action =>{
      res.json(action)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not process new action", err})
    })
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    if (body.notes && body.description && body.project_id) {
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
      res.status(400).json({ errorMessage: "Please Provide Name, Description, Project ID" })
  
  });

//middleware functions
function validateProjectId() {
    return function (req, res, next){
      const userId = Number(req.body.project_id)
      console.log(userId)
      projectDb.get(userId)
        .then(project => {
          project ? next() : res.status(400).json({ message: "invalid Project id" })
          
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "could not process request", err })
        }) 
    }
  }

module.exports = router;