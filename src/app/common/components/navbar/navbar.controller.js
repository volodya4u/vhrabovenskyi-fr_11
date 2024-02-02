
export default class Ctrl {
    /** @ngInject */
    constructor(AuthService, $location, notify, $rootScope) {
      // DI
      this.AuthService = AuthService;
      this.$location = $location;
      this.notify = notify;
      this.$rootScope = $rootScope;
    }

    logout() {
      this.$rootScope.showNavElements = false;
      this.notify.closeAll();
      this.AuthService.cleanCredentials();
      this.$location.path('/login');
    }
}
