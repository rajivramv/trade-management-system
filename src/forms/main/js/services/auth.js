angular.module('forms')
.service('auth',['$http','$q', function($http, $q){
  var auth;
  try {
    auth = JSON.parse(localStorage.getItem('auth'));
  } catch(err) {
    // do nothing for now
  } finally {
    if(!auth){
      _initAuth();
    }
  }
  function _initAuth() {
    auth = {
      client: {},
      clientAuthenticated: false,
      user: {},
      userAuthenticated: false
    }
  }
  this.getClient = function(){
    return auth.client
  }
  this.getUser = function(){
    return auth.user
  }
}]);