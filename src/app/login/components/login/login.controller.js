export default class Ctrl {
    /** @ngInject */
    constructor(LoginService, $location, NotifyService) {
      // DI
      this.LoginService = LoginService;
      this.$location = $location;
      this.NotifyService = NotifyService;

      this.dataLoading = false;
    }

    login() {
      this.NotifyService.closeAll();
      this.dataLoading = true;
      this.LoginService.loginUser(this.username, this.password).then(
        () => {
          this.$location.path('/');
        },
        (error) => {
          this.NotifyService.error(error.Message);
        }
      ).finally(() => {
        this.dataLoading = false;
      });
    }

}
