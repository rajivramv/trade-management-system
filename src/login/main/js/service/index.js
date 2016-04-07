angular.module('main')
.service('auth',['$http','$q', function($http, $q){
  var auth;
  try {
    auth = JSON.parse(localStorage.getItem('auth'));
  } catch(err) {
    // do nothing
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
  this.isClientAuthenticated = function(){
    return auth.clientAuthenticated;
  }
  this.isUserAuthenticated = function(){
    return auth.userAuthenticated;
  }
  this.authenticateClient = function(credentials){
    return $http.post('http://localhost:8001/b247/v1/clients/login', credentials)
      .then(function(response){
        auth.clientAuthenticated = true;
        auth.client = response.data;
        localStorage.setItem('auth', JSON.stringify(auth));
      });
  }
  this.authenticateUser = function(credentials){
    return $http.post('http://localhost:8001/b247/v1/clients/' + auth.client.client_id + '/login', credentials)
      .then(function(response){
        auth.userAuthenticated = true;
        auth.user = response.data;
        localStorage.setItem('auth', JSON.stringify(auth));
      });
  }
  this.logoutClient = function(){
    _initAuth();
    localStorage.setItem('auth', JSON.stringify(auth));
  }
  this.logoutUser = function(){
    auth.userAuthenticated = false;
    auth.user = {};
    localStorage.setItem('auth', JSON.stringify(auth));
  }
  this.getClient = function(){
    return auth.client
  }
  this.getUser = function(){
    return auth.user
  }
}]);