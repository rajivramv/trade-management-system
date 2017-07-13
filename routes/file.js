const path = require('path'), 
  express = require('express'),
  router = express.Router();

const mainDir = path.dirname(require.main.filename);

router.use('/', express.static(mainDir + '/www/login/main'));

router.use('/forms/:form/', function(req, res, next){
  express.static(mainDir + '/www/forms/' + req.params.form)(req, res, next);
});

router.use('/forms', express.static(mainDir + '/www/forms/main'));

router.use('/:type/',  function(req, res, next){
  express.static(mainDir + '/www/login/' + req.params.type)(req, res, next);
});

router.use('/vendors', express.static(mainDir + '/www/vendors'));

router.use((req,res,next,err) => console.log('here',err));

module.exports = router;
