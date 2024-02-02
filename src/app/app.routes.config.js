export default routesConfig;

// Using latest UI-ROUTER
// docs here: https://ui-router.github.io/docs/latest/

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'main'
    })
    .state('app.admin', {
      url: 'admin',
      component: 'admin'
    })
    .state('app.login', {
      url: 'login',
      component: 'login'
    })
    .state('app.dashboard', {
      url: 'dashboard/projectId=:projectId',
      component: 'dashboard'
    })
    .state('app.page401', {
      url: '401',
      component: 'page401'
    })
    .state('app.page404', {
      url: '404',
      component: 'page404'
    })

}
