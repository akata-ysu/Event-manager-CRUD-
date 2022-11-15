const express=require('express');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const mysql =require('mysql')
require('dotenv').config();

const app=express();

const port =process.env.PORT || 8080;

//Parsing middleware
app.use(bodyParser.urlencoded({extended:false}));

 //parse application/json
 app.use(bodyParser.json());
// static files
 app.use(express.static('public'));

//templatin engine
app.engine('hbs',exphbs.engine({extname:'.hbs'}))
app.set('view engine','hbs')


//connection pool

const pool=mysql.createPool({
    host      : process.env.DB_HOST,
    user      :process.env.DB_USER,
    password  :process.env.DB_PASS,
    database  :process.env.DB_NAME
})
//connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;//could not connect
    console.log('Connected as ID'+connection.threadId);

})



const routes=require('./server/routes/event')

app.use('/',routes);

app.listen(8080,()=>console.log(`Connected to port 8080`))