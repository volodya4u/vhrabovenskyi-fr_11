export default class Ctrl {
    /** @ngInject */
    constructor($state, RESOURCES, $mdDialog, DataService, UserService, NotifyService) {
      // DI
      this.$mdDialog = $mdDialog;
      this.$state = $state;
      this.DataService = DataService;
      this.UserService = UserService;
      this.NotifyService = NotifyService;
      this.textPattern = RESOURCES.TEXT_PATTERN;
      this.phonePattern = RESOURCES.PHONE_PATTERN;
      this.detailsPattern = RESOURCES.DETAILS_PATTERN;
    }

    cancel() {
      this.$mdDialog.cancel();
    }

    edit(form) {
      this.UserService.editUser(form).then(
        () => {
          this.$mdDialog.cancel();
          this.$state.reload();
        },
        (error) => {
          this.NotifyService.error(error.Message);
        }
      );
    }

    $onInit() {
      this.DataService.getLocations().then(list => this.locations = list);
      this.DataService.getPositions().then(list => this.positions = list);
    }

}
