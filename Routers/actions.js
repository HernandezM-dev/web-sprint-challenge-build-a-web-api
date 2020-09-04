const express = require('express');
const db = require('../data/helpers/actionModel');
const router = express.Router({
    mergeParams: true,
});

router.get('/', (req, res) => {
    const id = req.params.id
    db.get()
      .then(actions => {
        res.status(200).json(actions)
      })
      .catch(err => {
        res.status(500).json('cant retrieve actions')
      })
  });
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(actions => {
      res.status(200).json(actions)
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

module.exports = router;