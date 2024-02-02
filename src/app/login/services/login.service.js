import * as HttpStatus from 'http-status-codes';

export default class LoginService {
  /** @ngInject */
  constructor($http, $q, $location, RESOURCES, AuthService) {
    // DI
    this.$http = $http;
    this.$q = $q;
    this.$location = $location;
    this.resources = RESOURCES;
    this.AuthService = AuthService;
    this.headers = {
      'Content-Type': RESOURCES.CONTENT_TYPE,
      'Accept': RESOURCES.CONTENT_TYPE,
      'API_KEY': RESOURCES.API_KEY };
  }

  loginUser(email, password) {
    this.AuthService.cleanCredentials();
    let info = {
      Login: email,
      Password: password
    };

    return this.$http.post(this.resources.LOGIN_USER, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return this.$http.get(this.resources.EMPLOYEES + data.Id, { headers: this.headers })
        .then(({status, data}) => {
          if (status == HttpStatus.OK) {
            let isAdmin = false;
            data.Roles.forEach(item => {
              if (item.Id === 1) isAdmin = true;
            });
            let token = {
              Id: data.Id,
              Login: email,
              FullName: data.FullName,
              isAdmin: isAdmin
            };
            this.AuthService.setCredentials(token);
          }
        })
        .catch(error => this.$q.reject(error.data));
      }
    })
    .catch(error => this.$q.reject(error.data));
  }
}