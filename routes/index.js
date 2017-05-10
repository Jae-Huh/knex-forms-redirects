var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  res.redirect('/users')
})

router.get('/users', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function (users) {
      res.render('index', {
        users: users
      })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/users/new', function (req, res) {
  res.render('new')
})

router.post('/users/submit', function (req, res) {
  const name = req.body.name
  const email = req.body.email
  db.addUser(name, email, req.app.get('connection'))
    .then(function () {
      res.redirect('/users')
    })
})

router.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id, req.app.get('connection'))
    .then((result) => {
      // console.log(result)
      res.render('edit', result[0])
    })
})

router.post('/users/submit/:id', (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const email = req.body.email
  const edited = {
    name: name,
    email: email
  }

  db.editUser(id, edited, req.app.get('connection'))
    .then(() => {
      res.redirect('/users')
    })
})

router.get('/users/confirm/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id, req.app.get('connection'))
    .then((result) => {
      res.render('confirm', result[0])
    })
})

router.post('/users/delete/:id', (req, res) => {
  const id = Number(req.params.id)
  db.deleteUser(id, req.app.get('connection'))
    .then(() => {
      res.redirect('/users')
    })
})

module.exports = router
