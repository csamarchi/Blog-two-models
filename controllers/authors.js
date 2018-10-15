const express = require('express');
const router = express.Router();
//Models job is  to communicate with the DB
const Author = require('../models/authors')

//index route
router.get('/', (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    res.render('authors/index.ejs', {
      authors: foundAuthors
    });
  })
})

//new route
router.get('/new', (req, res) => {
  res.render('authors/new.ejs');
})

//show route
router.get('/:index', (req, res) => {
  Author.findById(req.params.index, (err, authorFound) => {
    res.render('authors/show.ejs', {
      author: authorFound
    })
  })
})

//edit
router.get('/:index/edit', (req, res) => {
  Author.findById(req.params.index, (err, editAuthor) => {
    res.render('authors/edit.ejs', {
      author: editAuthor
    });
  });
});

//post route
router.post('/', (req, res) => {
  Author.create(req.body, (err, createdAuthor) => {
    if(err){
      console.log(err)
    } else {
      res.redirect('/authors')
    }
  });
});

router.put('/:index', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, (err, updateBody) => {
    res.redirect('/authors');
  })
})

router.delete('/:index', (req, res) => {
  Author.findByIdAndRemove(req.params.index, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/authors')
    }
  })
})








module.exports = router;
