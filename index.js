// Express
const express  = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const auth = require('./services/auth');
const users = require('./services/users');
const switches = require('./services/switch');
const logs = require('./services/logs');
const admin_logs = require('./services/admin_logs');


app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())



// MongoDB
var db;
const uri = "mongodb+srv://admin:admin@r2ademo-7uf9z.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if(err) throw err;
  db = client.db("R2A")
  console.log(db)
});

app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/api/users',users)
app.use('/api/switch',switches)
app.use('/api/auth',auth)
app.use('/api/logs',logs)
app.use('/api/admin_logs',admin_logs)
app.use(express.static('public'))


app.listen(3000, ()=> {
  console.log('Listening to port 3000')
})

