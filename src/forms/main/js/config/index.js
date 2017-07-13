// Defining the root state
angular.module('forms')
.config(['$controllerProvider', '$provide', '$stateProvider', '$urlRouterProvider', function($controllerProvider, $provide, $stateProvider, $urlRouterProvider){
  angular.module('forms').lazy = {
    controller: $controllerProvider.register,
    service: $provide.service
  };
  
  $urlRouterProvider.otherwise('/form');

  $stateProvider
  .state('root', {
    url: '/form',
    views: {
      'body': {
        templateUrl: 'partials/body.html'
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
    url:'/:form',
    resolve: {
      dependencies: ['$q', '$stateParams', '$rootScope', _getDependencies]
    },
    views: {
      'header@root': {
        templateUrl: _getHTMLTemplate('header')
      },
      'section@root': {
        templateUrl: _getHTMLTemplate('section'),
        controllerProvider: ['$stateParams', _getController('section')]
      }
    }
  })
}])

function _getHTMLTemplate(view){
  return function($stateParams){
      return $stateParams.form + '/partials/' + view +'.html';
    }
}

function _getController(view){
  return function($stateParams){
      return $stateParams.form.split('-').join('') + view[0].toUpperCase() + view.slice(1) + 'Controller';
    }
}

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