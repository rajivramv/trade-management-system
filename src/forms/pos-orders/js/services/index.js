angular.module('forms').lazy.service('orders', ['$http', 'auth', function($http, auth){
  this.getItems = function getItemsForOrderNumber(orderNumber){
    var reqConfig = {headers: {Authorization: auth.getUser().userAuth}}
    return $http.get('/api/v1/pos/' + auth.getClient().clientId + '/orders/' + orderNumber, reqConfig)
  }
}])