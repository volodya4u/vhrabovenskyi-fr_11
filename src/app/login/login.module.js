import angular from 'angular';

// components
import login from './components/login/login.component';

// services
import AuthService from './services/auth.service';
import LoginService from './services/login.service';

export default angular
  .module('app.login', [])
  .component('login', login)
  .service('AuthService', AuthService)
  .service('LoginService', LoginService);
