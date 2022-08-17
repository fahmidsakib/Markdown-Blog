const express = require('express')
const router = express.Router()
const Articles = require('../models/article')

router.get('/new', (req, res) => {
    res.render('articles/newArticle')
})

router.get('/:id', async (req, res) => {
    const article = await Articles.findById(req.params.id)
    res.render('articles/details', { article: article })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Articles.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/delete/:id', async (req, res) => {
    const article = await Articles.deleteOne({_id: req.params.id})
    res.redirect('/')
})

router.post('/add', async (req, res) => {
    const article = new Articles({
        title: req.body.title,
        body: req.body.body,
        author_name: 'Fahmid Sakib'
    })
    await article.save()
    res.redirect('/')
})

router.post('/edit', async (req, res) => {
    const article = await Articles.findOneAndUpdate({ _id: req.body.id }, {
        title: req.body.title,
        body: req.body.body,
    })
    res.redirect('/')
})

module.exports = router