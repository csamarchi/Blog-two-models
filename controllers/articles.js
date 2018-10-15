const express = require('express');
const router = express.Router();

const Article = require('../models/articles')

//index route
router.get('/', (req, res) => {
  Article.find({}, (err, foundArticles) => {
    res.render('articles/index.ejs', {
      articles: foundArticles
    });
  });
});

//new route
router.get('/new', (req, res) => {
  res.render('./articles/new.ejs');
})

//show route
router.get('/:id', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    res.render('articles/show.ejs', {
      article: foundArticle
    });
  });
});

//edit route
router.get('/:id/edit', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    res.render('articles/edit.ejs', {
      article: foundArticle
    });
  });
});


//post route
router.post('/', (req, res)=>{
  console.log(req.body, ' this is yo body');
  Article.create(req.body, (err, createdArticle) => {
    if (err) {
      console.log(err);
    } else {
      console.log(createdArticle);
      res.redirect('/articles')
    }
  });
});

//update
router.put('/:id', (req, res)=>{
  Article.findByIdAndUpdate(req.params.id, req.body, (err, updateArticle)=>{
    res.redirect('/articles');
  });
});


//delete
router.delete('/:id', (req, res) => {
  Article.findOneAndDelete(req.params.id, (err, deleted) => {
    res.redirect('/articles')
  })
});



module.exports = router;
