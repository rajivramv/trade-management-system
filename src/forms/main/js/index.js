// Manually bootstrap angular once all the content is loaded

document.addEventListener('DOMContentLoaded', bootstrap, false);

function bootstrap(){
  console.log('Bootstrapping angular on main module...');
  angular.bootstrap(document, ['forms'], {strictDi: true});
};

angular.module('forms',['ui.router']);
