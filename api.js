var express = require('express');
var app = express();
var port = 7800;
var bodparser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var mongourl ="mongodb+srv://heena:HeeNaJAinN@cluster0.kjkpg.mongodb.net/assgn6?retryWrites=true&w=majority";
var cors =  require('cors');
var db;
;
app.use(cors());
app.use(bodparser.urlencoded({extended:true}));
app.use(bodparser.json());

app.get('/health',function(req,res){
res.send("Api is working")
});

app.get('/',function(req,res){
res.send('<a href ="http://localhost:7800/location" target="_blank">city</a>  </br> <a href ="http://localhost:7800/mealtype" target="_blank">mealtype</a> </br>  <a href ="http://localhost:7800/restuarant" target="_blank">restuarant</a> </br>  <a href ="http://localhost:7800/cuisine" target="_blank">cuisine</a> </br>  <a href ="http://localhost:7800/order" target="_blank">orders</a>  </br> ')
})


//list of city
app.get('/location',function(req,res){
  db.collection('city').find().toArray(function(err,result){
      if (err) throw err;
      res.send(result)
  })
})

app.get('/mealtype',function(req,res){
    db.collection('mealtype').find().toArray(function(err,result){
        if (err) throw err;
        res.send(result)
    })
  })



  app.get('/restuarant',function(req,res){
        var query ={};
        if(req.query.city){
            query={city:req.query.city}
        }else{
            query = {}
        }
    db.collection('restuarant').find().toArray(function(err,result){
        if (err) throw err;
        res.send(result)
    })
  })


  
app.get('/cuisine',function(req,res){
    db.collection('cuisine').find().toArray(function(err,result){
        if (err) throw err;
        res.send(result)
    })
  })



app.get('/order',function(req,res){
    db.collection('order').find().toArray(function(err,result){
        if (err) throw err;
        res.send(result)
    })
  })



MongoClient.connect(mongourl,function(err,connection){
    if(err) throw err;
    db = connection.db('assgn6.');
    app.listen(7800,function(err){
        if (err) throw err;
        console.log('server is running on port  7800')
    })
})