var express = require('express'),
  router = express.Router();

var clients = [{
    id: 'acme',
    pass: 'acme',
    logo: 'assets/acme.gif',
    auth: Math.random().toString(36).slice(2),
  }],
  clientIds = clients.map(function(client){
    return client.id;
  }),
  users = [{
    username: 'user',
    pass: 'user',
    clientId: 'acme',
    auth: Math.random().toString(36).slice(2),
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
  }),
  orders = {
    acme: {
      0: [
        {skuCode: 12345, desc: 'Drinking Chocolate', uom: 'ea', quantity: 1, price: 130, discount:1, tax:0},
        {skuCode: 54234, desc: 'Coca Cola 1 litre bottle', uom: 'ea', quantity: 1, price: 130, discount:1, tax:0},
        {skuCode: 63434, desc: 'Maggi Noodles', uom: 'ea', quantity: 1, price: 130, discount:1, tax:0}
      ],
      1: [{skuCode: 63434, desc: 'Dettol', uom: 'ea', quantity: 1, price: 130, discount:1, tax:0}]
    }
  }

router.use(function(req, res,next){
  console.log(req.method, req.path);
  next();
});

router.use(function(req, res, next){
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

router.post('/api/v1/clients/login', function(req, res, next){
  if(!req.body || !req.body.clientId){
    return res.status(400).send('Invalid credentials');
  }

  var i = clientIds.indexOf(req.body.clientId),
    client = clients[i];

  if(client && client.pass === req.body.clientPass){
    res.send({clientId: client.id, clientAuth: client.auth, logo: client.logo});
  } else {
    res.status(400).send('Invalid credentials');
  }

});

router.use('/api/v1/clients/:clientId', function(req, res, next){
  var i = clientIds.indexOf(req.params.clientId),
    client = clients[i];

  if(!client || !(client.auth === req.get('authorization'))){
    return res.status(401).send('Not authenticated')
  }
  next()
});

router.post('/api/v1/clients/:clientId/login', function(req, res, next){
  if(!req.body || !req.body.username){
    return res.status(400).send('Invalid credentials');
  }
  var i = clientIds.indexOf(req.params.clientId),
    client = clients[i],
    i = usernames.indexOf(req.body.username),
    user = users[i];

  if(client && user && user.clientId === client.id && req.body.password === user.pass){
    res.json({userAuth: user.auth});
  } else {
    res.status(400).send('Invalid credentials');
  }

});

router.use('/api/v1/pos/:clientId', function(req, res, next){
  var i = clientIds.indexOf(req.params.clientId),
  client = clients[i];
  // A simple check for now
  if(!req.get('authorization') ){
    return res.status(401).send('Not authenticated')
  }
  next()
});

router.get('/api/v1/pos/:clientId/orders/:orderNumber', function(req, res, next){
  var clientOrders = orders[req.params.clientId];
  if (clientOrders == null) {
    return res.status(400).send('Bad Request');
  }
  var order = clientOrders[req.params.orderNumber]
  if (order == null ) {
    return res.status(400).send('Bad Request')
  }
  res.json(order);
});

module.exports = router;
