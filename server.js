var express = require('express'),
  app = express();

app.use(function(req, res,next){
  console.log(req.method, req.path);
  next();
});

app.use('/forms/:form/', function(req, res, next){
  express.static(__dirname + '/www/forms/' + req.params.form)(req, res, next);
});

app.use('/forms', express.static(__dirname + '/www/forms/main'));

app.use('/:type/',  function(req, res, next){
  express.static(__dirname + '/www/login/' + req.params.type)(req, res, next);
});

app.use('/', express.static(__dirname + '/www/login/main'));

app.use('/vendors', express.static(__dirname + '/www/vendors'));


app.listen(8000, function(){
  console.log('Listening on port 8000');
});