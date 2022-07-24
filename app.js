const express = require('express')
const restaurantList = require('./restaurant.json').results

const app = express()
const port = 3000

// 載入 handlebars
const exphbs = require('express-handlebars')
// 設定 樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  // 觀摩ModelAnswers trim()去除關鍵字前後空格
  const keywords =  req.query.keywords
  const keyword = keywords.trim().toLowerCase()

  const restaurant = restaurantList.filter((restaurant) => {
    return restaurant.category.includes(keyword) || restaurant.name.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurant: restaurant, keywords })
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})