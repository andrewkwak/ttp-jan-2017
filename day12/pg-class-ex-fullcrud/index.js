var pg = require('pg');
var express = require('express');
// body parser
var bodyParser = require('body-parser');



var app = express();

// json method
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')
app.set('views', './views')
//get all hats
app.get('/hats', function(req, res){
  pg.connect('postgres://localhost:5432/ttp_jan', function(err, client, done){
    client.query('select * from hats', function(err, result) {
      res.render('hats', { data: result.rows});
      console.log(result.rows)
      done();
      pg.end();
    })
  })
})

//get all users READ
app.get('/users', function(req, res){
  pg.connect('postgres://localhost:5432/ttp_jan', function(err, client, done){
    client.query('select * from users', function(err, result) {
      res.render('users', { data: result.rows});
      console.log(result.rows)
      done();
      pg.end();
    })
  })
})

//get one user
app.get('/users/:id', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_jan', function(err, client, done){
    var user_id = req.params.id
    console.log(user_id)
    client.query(`select * from users where id='${user_id}'`, function(err,result){
      res.render('show', { user: result.rows[0]})
      console.log(result.rows);
      done();
      pg.end();
    })
  })
})
//create a user
app.post('/users', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_jan', function(err, client, done){
    client.query(`insert into users(name,email) values('${req.body.name}','${req.body.email}')`, function(err, result){
      console.log(err);

      res.redirect('/users');
      done();
      pg.end();
    })
  })

})

//delete a user

app.get('/delete/users/:id', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_jan', function(err, client, done){
    var user_id = req.params.id;
    client.query(`delete from users where id='${user_id}'`, function(err, result){
      console.log(err);
      console.log(user_id);
      res.redirect('/users');
      done();
      pg.end();
    })
  })
})




//update a user
app.put('/users/:id', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_jan', function(err, client, done){
    var user_id = req.params.id;
    client.query(`update from users where id='${user_id}'`, function(err, result){
  console.log(err);
      console.log(user_id);
      res.redirect('/users');
      done();
      pg.end();
    })
  })
})

app.listen(3000, function(){
  console.log("Listening on port 3000")
})
