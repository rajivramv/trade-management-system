// Defining the root state
angular.module('main')
.config(['$controllerProvider', '$stateProvider', '$urlRouterProvider', function($controllerProvider, $stateProvider, $urlRouterProvider){

  angular.module('main').controllerProvider = $controllerProvider;

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('root',{
    url:'/',
    views: {
      'body': {
        templateUrl: 'partials/body.html',
        controller: 'fooController'
      },
      'header@root': {
        templateUrl: 'partials/header.html'
      },
      'section@root': {
        templateUrl: 'partials/section.html'
      },
      'footer@root': {
        templateUrl: 'partials/footer.html'
      }
    }
  })
  .state('root.form',{
    url:'?form',
    resolve: {
      dependencies: ['$q', '$stateParams', '$rootScope', _getDependencies]
    },
    views: {
      'header@root': {
        templateUrl: _getHTMLFragment('header')
      },
      'section@root': {
        templateUrl: _getHTMLFragment('section'),
        controllerProvider: ['$stateParams', _getController('section')]
      }
    }
  })
}])
.controller('fooController',['$state', function($state){
  setTimeout(function(){
    $state.go('root.form', {form: 'pos-orders'});
  }, 100);
}])

function _getHTMLFragment(frag){
  return function($stateParams){
      return $stateParams.form + '/partials/' + frag +'.html';
    }
}

function _getController(frag){
  return function($stateParams){
      return $stateParams.form.split('-').join('') + frag[0].toUpperCase() + frag.slice(1) + 'Controller';
    }
}

// Gets a reference of $rootScope and $stateParams using function definition parsing
function _getDependencies($q, $stateParams, $rootScope){
  var toLoad = [$stateParams.form + '/js/' + 'index.min.js'],
    deferred = $q.defer();
  $script(toLoad, function(){
    $rootScope.$apply(function(){
      deferred.resolve();
    });
  });
  return deferred.promise
}