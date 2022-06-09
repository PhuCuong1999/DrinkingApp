const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', './views')

var low = require('lowdb')
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("./database.json");
var db = low(adapter);

db.defaults({ images: []})
.write()

app.use(
    express.urlencoded({
      extended: true,
    })
);


  
app.use(express.json());

app.get('/', (req, res) => {

  res.render('app/index')
})

app.get('/playgame', (req, res) => {

    res.render('app/playgame')
})

app.post('/listID', (req, res)=>{

  var data = db.get('images').value()
  var ids = []
  data.forEach(element => {
    ids.push(element.id)
  });

  res.json({data: ids})

})

app.post('/getNewImage', (req, res)=>{

  var id = parseInt(req.body.id)

  var data = db.get('images').find({ id: id }).value()
  
  res.json({data})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})