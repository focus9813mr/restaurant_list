const express = require('express')
const app = express()
const port = 3000

// 載入 handlebars
const exphbs = require('express-handlebars')
// 設定 樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('veiw engine', 'handlebars')

app.get('/', (req, res) => {
  res.send('Hello World~')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})