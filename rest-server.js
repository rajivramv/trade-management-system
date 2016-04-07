var express = require('express'),
  app = express();

var clients = [{
    id: 'acme',
    pass: 'acme',
    logo: 'assets/acme.gif'
  }],
  clientIds = clients.map(function(client){
    return client.id;
  }),
  users = [{
    username: 'rajiv',
    pass: 'rajiv',
    clientId: 'acme',
    role: {
      Administrator: {
        forms: []
      },
      Sales: {
        forms: ['POS Orders']
      }
    }
  }],
  usernames = users.map(function(user){
    return user.username;
  });

app.use(function(req, res,next){
  console.log(req.method, req.path);
  next();
});

app.use(function(req, res, next){
  var data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){
    data += chunk;
  })
  req.on('end', function(){
    try {
      req.body = JSON.parse(data || null);
      next();
    } catch(err) {
      console.log('JSON parse error', err);
      res.status(400).send(err);
    }
  })
});

app.options(/.*/, function(req, res, next){
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
  res.set(headers).status(200).send('OK');
});

app.post(/.*/, function(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/b247/v1/clients/login', function(req, res, next){
  if(!req.body || !req.body.client_id){
    return res.status(400).send('Invalid credentials');
  }

  var i = clientIds.indexOf(req.body.client_id.trim()),
    client = clients[i];

  if(client && client.pass === req.body.client_pass.trim()){
    client.auth = Date.now();
    res.send({client_id: client.id, client_auth: client.auth, logo: client.logo});
  } else {
    res.status(400).send('Invalid credentials');
  }

});

app.post('/b247/v1/clients/:clientId/login', function(req, res, next){
  if(!req.body || !req.body.username){
    return res.status(400).send('Invalid credentials');
  }
  var i = clientIds.indexOf(req.params.clientId.trim()),
    client = clients[i],
    i = usernames.indexOf(req.body.username.trim()),
    user = users[i];

  if(client && user && user.clientId === client.id && req.body.password === user.pass){
    user.auth = Date.now();
    res.send({user_auth: user.auth});
  } else {
    res.status(400).send('Invalid credentials');
  }

});

app.get('/b247/v1/clients/:clientId/pos/orders', function(req, res, next){
});


app.listen(8001, function(){
  console.log('Listening on port 8001');
});