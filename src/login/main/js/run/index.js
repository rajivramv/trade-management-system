angular.module('main')
.run(['auth', '$rootScope', '$state', function(auth, $rootScope, $state){
   $rootScope.$on('$stateChangeStart', function(e, to) {
    if (!to.data || !angular.isFunction(to.data.rule)) return;
    var result = to.data.rule(auth);

    if (result && result.to) {
      e.preventDefault();
      $state.go(result.to, result.param);
    }
  });
}]);