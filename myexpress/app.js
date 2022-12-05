
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
var cors = require('cors')
const router = express.Router();
const app = express()
const port = 3000


const art = require('./articles')
const users = require('./users')
const cat = require('./categories')

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bde_bd'
})

connection.connect()

/*router.use(function timeLog(req, res, next){
  console.log('Time: ', Date.now());
  next();
});*/

router.get('/', function(req, res){
  res.send('Home Page');
});

app.use('/users', users)
app.use('/articles', art)
app.use('/categories', cat)
app.use(art)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

