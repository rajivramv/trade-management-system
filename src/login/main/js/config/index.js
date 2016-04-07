// Defining the root state
angular.module('main')
.config(['$controllerProvider', '$stateProvider', '$urlRouterProvider', function($controllerProvider, $stateProvider, $urlRouterProvider){

  angular.module('main').controllerProvider = $controllerProvider;

  $urlRouterProvider.otherwise('/home/company');

  $stateProvider
  .state('root', {
    abstract: true,
    url: '/home',
    views: {
      'body': {
        templateUrl: 'partials/body.html'
      }
    }
  })
  .state('root.client', {
    url:'/company',
    resolve: {
      dependencies: ['$q', '$stateParams', '$rootScope', _getDependencies('client/js/index.min.js')]
    },
    data: {
      rule: function(auth){
        return auth.isClientAuthenticated() ? {to: 'root.client.user', param: {forward: true}} : null;
      }
    },
    views: {
      'header@root': {
        templateUrl: 'client/partials/header.html'
      },
      'footer@root': {
        templateUrl: 'client/partials/footer.html'
      },
      'section@root': {
        templateUrl: 'client/partials/section.html',
        controller: 'clientSectionController'
      }
    }
  })
  .state('root.client.user', {
    url:'/user',
    resolve:{
      dependencies: ['$q', '$stateParams', '$rootScope', _getDependencies('user/js/index.min.js')]
    },
    data: {
      rule: function(auth){
        return !auth.isClientAuthenticated() ? {to: 'root.client', param: {error: new Error('Not authenticated')}} : auth.isUserAuthenticated() ? {to: 'root.client.user.roles', param: {forward: true}} : null;
      }
    },
    views: {
      'section@root': {
        templateUrl: 'user/partials/section.html',
        controller: 'userSectionController'
      }
    }
  })
  .state('root.client.user.roles', {
    url:'/roles',
    resolve:{
      dependencies: ['$q', '$stateParams', '$rootScope', _getDependencies('roles/js/index.min.js')]
    },
    data: {
      rule: function(auth){
        return !auth.isUserAuthenticated() ? {to: 'root.client.user', param: new Error('Not authenticated')} : null;
      }
    },
    views: {
      'section@root': {
        templateUrl: 'roles/partials/section.html',
        controller: 'rolesSectionController'
      }
    }
  })
}]);


// Gets a reference of $rootScope and $stateParams using function definition parsing
function _getDependencies(toLoad){
  return function($q, $stateParams, $rootScope){
    var deferred = $q.defer();
    $script(toLoad, function(){
      $rootScope.$apply(function(){
        deferred.resolve();
      });
    });
    return deferred.promise
  }
}