// Manually bootstrap angular once all the content is loaded

document.addEventListener('DOMContentLoaded', bootstrap, false);

function bootstrap(){
  console.log('Bootstrapping angular on main module...');
  angular.bootstrap(document, ['main'], {strictDi: true});
};

angular.module('main',['ui.router']);
