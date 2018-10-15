const express = require('express');
const router = express.Router();
//Models job is  to communicate with the DB
const Author = require('../models/authors')


router.get('/', (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    res.render('authors/index.ejs', {
      authors: foundAuthors
    });
  })
})

router.get('/', (req, res) => {
  res.render('authors/index.ejs');
})

router.get('/new', (req, res) => {
  res.render('authors/new.ejs');
})


router.post('/', (req, res) => {

  Author.create(req.body, (err, createdAuthor) => {

    if(err){
      console.log(err)
    } else {
      res.redirect('/authors')
    }
  });

});

router.get('/authors/:index', (req, res) => {
  Authors.findById(req.params.index, (err, authorFound) => {
    res.render('authors/show.ejs', {
      author: authorFound
    })
  })
})








module.exports = router;
