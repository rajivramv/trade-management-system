angular.module('main').lazy.controller('userSectionController', ['$scope', '$window', '$state', 'auth', function($scope, $window, $state, auth){

  $scope.authenticateUser = function(){
    auth.authenticateUser({username: $scope.userId, password: $scope.userPass}).then(function(){
      $state.go('.roles');
    }, function(){
      $window.alert('Invalid credentials');
    });
  }

  $scope.company = {logo: auth.getClient().logo};

  $scope.logout = function(){
    auth.logoutClient();
    $state.reload();
  }

}]);