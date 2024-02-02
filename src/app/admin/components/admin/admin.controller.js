export default class Ctrl {
    /** @ngInject */
    constructor(UserService, NotifyService, $mdDialog, RESOURCES) {
      // DI
      this.UserService = UserService;
      this.NotifyService = NotifyService;
      this.$mdDialog = $mdDialog;
      this.RESOURCES = RESOURCES;

      this.dataLoading = false;
    }

    getAllUsers() {
      this.NotifyService.closeAll();
      this.dataLoading = true;
      this.UserService.getAllUsers().then(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.NotifyService.error(error.Message);
        }
      ).finally(() => {
        this.dataLoading = false;
      });
    }

    add() {
      this.$mdDialog.show({
        template: '<create-user></create-user>'
      });
    }

    edit(user, event) {
      user.Birthday = new Date(user.Birthday);
      this.$mdDialog.show({
        targetEvent: event,
        controllerAs: 'ctrl',
        template: '<edit-user data="ctrl.data"></edit-user>',
        controller: function() { 
          this.data = user;
        }
      });
    }

    remove(id, event) {
      let confirm = this.$mdDialog.confirm()
        .title('Are you sure to delete the user?')
        .targetEvent(event)
        .ok('Yes')
        .cancel('No');

      this.$mdDialog.show(confirm).then(() => {
        this.UserService.removeUser(id).then(
          () => {
            this.getAllUsers();
          },
          (error) => {
            this.NotifyService.error(error.Message);
          }
        )
      }, () => {});
    }

    $onInit() {
      this.getAllUsers();
    }

}
