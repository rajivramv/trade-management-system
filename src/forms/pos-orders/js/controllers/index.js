angular.module('forms')
.lazy.controller('posordersSectionController', ['$scope', 'orders', function($scope, orders){
  $scope.search = {orderNumber: 0};

  $scope.getOrder = getOrder;
  getOrder(); 

  function getOrder(){
    if ($scope.order && ($scope.order.orderNumber === $scope.search.orderNumber)) {
      return
    }
    orders.getItems($scope.search.orderNumber).then(function(res){
      $scope.currentOrder = res.data;
      $scope.order = Object.assign({}, $scope.order, {orderNumber: $scope.search.orderNumber});
    }).catch(function(){
      $scope.currentOrder = [];
    })
  }

}]);