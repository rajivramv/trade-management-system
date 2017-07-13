angular.module('main').lazy.controller('clientSectionController', ['$scope', '$window', '$state', 'auth', function($scope, $window, $state, auth){

  $scope.authenticateClient = function(){
    auth.authenticateClient({clientId: $scope.clientId, clientPass: $scope.clientPass}).then(function(){
      $state.go('.user');
    }, function(){
      $window.alert('Invalid credentials');
    });
  }
}]);