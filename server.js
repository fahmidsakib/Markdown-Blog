const express = require('express')
const mongoose = require('mongoose')
const Articles = require('./models/article')
const articlesRouter = require('./routes/articles')
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("Error", err))

app.set('view engine', 'ejs')
app.use('/articles', articlesRouter)

app.get('/', async (req, res) => {
    const articles = await Articles.find({})
    console.log(req.headers)
    res.render('index', { articles: articles })
})

app.listen(8000)