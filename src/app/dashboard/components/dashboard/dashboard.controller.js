export default class Ctrl {
    /** @ngInject */
    constructor(DataService, TicketService, ProjectService, NotifyService, UserService,
        $mdDialog, $stateParams, $rootScope, RESOURCES, $location) {
      // DI
      this.DataService = DataService;
      this.TicketService = TicketService;
      this.ProjectService = ProjectService;
      this.UserService = UserService;
      this.NotifyService = NotifyService;
      this.$mdDialog = $mdDialog;
      this.$stateParams = $stateParams;
      this.$rootScope = $rootScope;
      this.RESOURCES = RESOURCES;
      this.projectId = $stateParams.projectId;
      this.userId = $rootScope.token.Id;
      this.$location = $location;

      this.dataLoading = false;
    }

    getProjectTickets() {
      this.NotifyService.closeAll();
      this.dataLoading = true;
      let ticketStatus = this.ticketStatus;
      this.TicketService.getProjectTickets(this.projectId).then(
        (data) => {
          this.models = ticketStatus.map(status => {
            let tickets = [];
            data.forEach(ticket => {
              if (status.id === ticket.StatusId) tickets.push(ticket);
            })
            let listName = status.name;
            return {listName: listName, items: tickets, dragging: false}
          })
        },
        (error) => {
          this.NotifyService.error(error.Message);
        }
      ).finally(() => {
        this.dataLoading = false;
      });
    }

    getProject() {
      this.NotifyService.closeAll();
      this.dataLoading = true;
      this.ProjectService.getProject(this.projectId).then(
        (data) => {
          this.project = data;
        },
        (error) => {
          this.NotifyService.error(error.Message);
        }
      ).finally(() => {
        this.dataLoading = false;
      });
    }

    createTicket() {
      let self = this;
      this.$mdDialog.show({
        controllerAs: 'ctrl',
        template: '<create-ticket data="ctrl.data" text="ctrl.textPattern" details="ctrl.detailsPattern" '
                  + 'types="ctrl.types" users="ctrl.users" create="ctrl.create(ctrl.data)" cancel="ctrl.cancel()">'
                  + '</create-ticket>',
        controller: function() {
          this.textPattern = self.RESOURCES.TEXT_PATTERN;
          this.detailsPattern = self.RESOURCES.DETAILS_PATTERN;
          this.types = self.ticketTypes;
          this.users = self.users;

          this.create = (form) => {
            self.TicketService.createTicket(form, self.projectId, self.userId).then(
              () => {
                self.$mdDialog.cancel();
                self.getProjectTickets();
              },
              (error) => {
                self.NotifyService.error(error.Message);
              }
            );
          }

          this.cancel = () => {
            self.$mdDialog.cancel();
          }
        }
      });
    }

    edit(item) {
      let self = this;
      this.$mdDialog.show({
        controllerAs: 'ctrl',
        template: '<edit-ticket data="ctrl.data" text="ctrl.textPattern" details="ctrl.detailsPattern" '
                  + 'types="ctrl.types" users="ctrl.users" edit="ctrl.edit(ctrl.data)" cancel="ctrl.cancel()">'
                  + '</edit-ticket>',
        controller: function() {
          this.data = item;
          this.textPattern = self.RESOURCES.TEXT_PATTERN;
          this.detailsPattern = self.RESOURCES.DETAILS_PATTERN;
          this.types = self.ticketTypes;
          this.users = self.users;

          this.edit = (form) => {
            self.TicketService.editTicket(form).then(
              () => {
                self.$mdDialog.cancel();
                self.getProjectTickets();
              },
              (error) => {
                self.NotifyService.error(error.Message);
              }
            );
          }

          this.cancel = () => {
            self.$mdDialog.cancel();
          }
        }
      })
    }

    remove(id) {
      let confirm = this.$mdDialog.confirm()
        .title('Are you sure to delete the ticket?')
        .ok('Yes')
        .cancel('No');

      this.$mdDialog.show(confirm).then(() => {
        this.TicketService.removeTicket(id).then(
          () => {
            this.getProjectTickets();
          },
          (error) => {
            this.NotifyService.error(error.Message);
          }
        )
      }, () => {});
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

    getSelectedItemsIncluding(list, item) {
      item.selected = true;
      return list.items.filter((item) => { return item.selected; });
    }

    onDragstart(list, event) {
      list.dragging = true;
      if (event.dataTransfer.setDragImage) {
        event.dataTransfer.setDragImage(this.img, 0, 0);
      }
    }

    onDrop(list, items, index, parrentIndex) {
      items.forEach((item) => {
        item.selected = false;
        this.TicketService.editTicketStatus(item, parrentIndex).then(
          () => {
            list.items = list.items.slice(0, index)
            .concat(item)
            .concat(list.items.slice(index));
          },
          (error) => {
            this.NotifyService.error(error.Message);
          }
        )
      });
      return true;
    }

    onMoved(list) {
      list.items = list.items.filter((item) => { return !item.selected; });
    }

    $onInit() {
      this.DataService.getTicketStatus().then(list => this.ticketStatus = list)
      .then(() => {
        this.getProject();
      })
      .then(() => {
        this.getProjectTickets();
      })

      this.DataService.getTicketType().then(list => this.ticketTypes = list);
      this.getAllUsers();

      this.img = new Image();
      this.img.src = 'assets/img/ic_content_copy_black_24dp_2x.png';
    }

}
