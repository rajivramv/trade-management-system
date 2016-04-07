angular.module('main').controllerProvider.register('clientSectionController', ['$scope', '$window', '$state', 'auth', function($scope, $window, $state, auth){

  $scope.authenticateClient = function(){
    auth.authenticateClient({client_id: $scope.clientId, client_pass: $scope.clientPass}).then(function(){
      $state.go('.user');
    }, function(){
      $window.alert('Invalid credentials');
    });
  }
}]);