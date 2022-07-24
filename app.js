const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json').results

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
  const keyword =  req.query.keyword
  const restaurant = restaurantList.filter((restaurant) => {
    return restaurant.category.includes(keyword) || restaurant.name.includes(keyword)
  })
  res.render('index', { restaurant: restaurant })
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})