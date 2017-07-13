angular.module('main').lazy.controller('rolesSectionController', ['$scope', '$window', '$location', '$state', 'auth', function($scope, $window, $location, $state, auth){

  $scope.openForm = function(form){
    var url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/forms/#/form/' + (form || '').toLowerCase();
    $window.open(url, 'Form', 'width=1024,height=768,menubar=no,toolbar=no,location=no,resizable=no');
  };

  $scope.logout = function(){
    auth.logoutUser();
    $state.reload();
  }

}]);