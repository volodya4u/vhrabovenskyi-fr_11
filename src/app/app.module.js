// DEPENDENCIES
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngCookies from 'angular-cookies';
import cgNotify from '@cgross/angular-notify';
import angularMoment from 'angular-moment';
import materialDesign from 'angular-material';

// CONFIGS
import routesConfig from './app.routes.config';
import httpInterceptorConfig from './app.httpInterceptor.config';

// CUSTOM MODULES
import commonModule from './common/common.module';
import adminModule from './admin/admin.module';
import dashboardModule from './dashboard/dashboard.module';
import loginModule from './login/login.module';
import projectModule from './project/project.module';

// MAIN COMPONENT
import main from './main/main.component'

// COMPONENTS
import page401 from './401/401.component'
import page404 from './404/404.component'

// STYLES
import '@cgross/angular-notify/angular-notify.css';
import 'glyphicons-only-bootstrap/css/bootstrap.min.css';
import 'angular-material/angular-material.css';
import './app.scss';

// JS
import 'jquery/src/jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'angular-drag-and-drop-lists/angular-drag-and-drop-lists';

angular
  .module('app', [
    // DEPENDENCIES
    uiRouter,
    uiBootstrap,
    ngCookies,
    cgNotify,
    angularMoment,
    materialDesign,
    'dndLists',

    // CUSTOM MODULES
    dashboardModule.name,
    commonModule.name,
    adminModule.name,
    loginModule.name,
    projectModule.name
  ])
  .config(routesConfig)
  .config(httpInterceptorConfig)
  .component('main', main)
  .component('page401', page401)
  .component('page404', page404)
  .constant('RESOURCES', (() => {
    let url = 'http://aac-vm.universe.dart.spb:8080/api/';
    let employees = url + 'employees/';
    let projects = url + 'projects/';
    let timesheets = url + 'timesheets/';
    let tasks = url + 'tasks/';
    return {
      API_URL: url,
      TEXT_PATTERN: '^[a-zA-Z0-9._%+-]+( [a-zA-Z0-9._%+-]+)*$',
      DETAILS_PATTERN: '^[a-zA-Z0-9.,/_%+-]+( [a-zA-Z0-9.,/_%+-]+)*$',
      PHONE_PATTERN: '^[+]*3*8*[ ]{0,1}[(-]{0,1}0[3-9][0-9][)-]{0,1}[ ]{0,1}[0-9]{3}[ -]{0,1}[0-9]{2}[ -]{0,1}[0-9]{2}$',
      CONTENT_TYPE: 'application/json',
      API_KEY: 'Cn48qiRKDblyVoJAzmGH%2fij%2freAc%2bX9IxrOZGf7%2ftpM%3d',
      EMPLOYEES: employees,
      LOGIN_USER: employees + 'login',
      PROJECTS: projects,
      USER_PROJECTS: projects + 'search?model.employeeId=',
      TIMESHEETS: timesheets,
      USER_TIMESHEETS: timesheets + 'search?query.empId=',
      TASKS: tasks,
      PROJECT_TASKS: tasks + 'search?taskSearch.projectId='
    }
  })())
  .run(($rootScope, $state, $stateParams, notify, AuthService, $location) => {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    notify.config({
      duration: 1000 * 10
    });

    $rootScope.$on('$locationChangeStart', () => {
      // redirect to login page if not logged in and trying to access a restricted page
      let authenticated = AuthService.isAuthenticated();
      if (authenticated) {
        $rootScope.showNavElements = true;
        let credentials = AuthService.getCredentials();
        $rootScope.token = credentials.token;
        if ($location.path() === '/login') $location.path('/');
        if ($location.path() === '/admin' && !credentials.token.isAdmin) $location.path('/');
      } else {
        $rootScope.showNavElements = false;
        if ($location.path() !== '/login') $location.path('/login');
      }
    });
  });
