export default class Ctrl {
  /** @ngInject */
  constructor(ProjectService, NotifyService, $mdDialog, $state, RESOURCES, $rootScope, moment, $q) {
    // DI
    this.ProjectService = ProjectService;
    this.NotifyService = NotifyService;
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.RESOURCES = RESOURCES;
    this.moment = moment;
    this.$q = $q;
    this.startDate = this.moment().startOf('week').utc(true);

    this.dataLoading = false;
  }

  getWeek(now) {
    let deferred = this.$q.defer();
    let week = [];
    week.push(now.toDate());
    for (let i = 1; i < 7; i++) {
      let day = now.add(1, 'days');
      week.push(day.toDate());
    }
    this.week = week;
    deferred.resolve(week);
    return deferred.promise;
  }

  showWeek() {
    let array = this.week;
    return array.map(day => this.moment(day).format('DD/MM/YYYY'));
  }

  getUserTimeshifts() {
    this.NotifyService.closeAll();
    this.dataLoading = true;
    let id = this.$rootScope.token.Id;
    let week = this.week;
    this.ProjectService.getUserTimeshifts(id, week).then(
      (data) => {
        this.getUserProjects(id, data, week);
      },
      (error) => {
        this.NotifyService.error(error.Message);
      }
    ).finally(() => {
      this.dataLoading = false;
    });
  }

  minusWeek() {
    let date = this.startDate;
    date = date.subtract(13, 'days');
    this.getWeek(date).then(() => {
      this.getUserTimeshifts();
    })
  }

  plusWeek() {
    let date = this.startDate;
    date = date.add(1, 'days');
    this.getWeek(date).then(() => {
      this.getUserTimeshifts();
    })
  }

  getUserProjects(id, timeSheets, week) {
    this.ProjectService.getUserProjects(id).then(
      (data) => {
        data.forEach(project => {
          project.Tickets = project.Tickets.filter(ticket => ticket.ResponsibleId === id && ticket.StatusId !== 5);
          project.Tickets.forEach(ticket => {
            ticket.TimeSheets = week.map(day => {
              let dayDate = this.moment(day).format('YYYY-MM-DD');
              if (typeof timeSheets !== 'undefined' && timeSheets.length > 0) {
                let time = timeSheets.filter(item =>
                    item.TicketId === ticket.Id && dayDate === this.moment(item.Date).format('YYYY-MM-DD'));
                return {date: day, timeSheet: time[0], showTooltip: true};
              } else return {date: day, timeSheet: null};
            });
          });

          let ids = project.Tickets.map(ticket => ticket.Id);
          project.Total = week.map(day => {
            let dayDate = this.moment(day).format('YYYY-MM-DD');
            let time = 0;
            if (typeof timeSheets !== 'undefined' && timeSheets.length > 0) {
              let array = timeSheets.filter(item =>
                  ids.includes(item.TicketId) && dayDate === this.moment(item.Date).format('YYYY-MM-DD'));
              if (typeof array !== 'undefined' && array.length > 0) {
                time = array.map(item => item.LoggedTime).reduce((a,b)=> a + b);
              }         
            }
            return time;
          })
        });
        this.projects = data;
      },
      (error) => {
        this.dataLoading = false;
        this.NotifyService.error(error.Message);
      }
    )
  }

  addHours(item, ticketId) {
    let self = this;
    if (item.timeSheet === null || typeof item.timeSheet === 'undefined') {
      this.$mdDialog.show({
        controllerAs: 'ctrl',
        template: '<create-timesheet data="ctrl.data" pattern="ctrl.pattern" '
                  + 'create="ctrl.create(ctrl.data)" cancel="ctrl.cancel()">'
                  + '</create-timesheet>',
        controller: function() {
          this.data = item.timeSheet;
          this.pattern = self.RESOURCES.TEXT_PATTERN;

          this.create = (form) => {
            self.ProjectService.createTimeshifts(form, item.date, ticketId).then(
              () => {
                self.$mdDialog.cancel();
                self.getUserTimeshifts();
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
    } else {
      this.$mdDialog.show({
        controllerAs: 'ctrl',
        template: '<edit-timesheet data="ctrl.data" pattern="ctrl.pattern" '
                  + 'edit="ctrl.edit(ctrl.data)" cancel="ctrl.cancel()">'
                  + '</edit-timesheet>',
        controller: function() { 
          this.data = item.timeSheet;
          this.pattern = self.RESOURCES.TEXT_PATTERN;

          this.edit = (form) => {
            self.ProjectService.editTimeshifts(form).then(
              () => {
                self.$mdDialog.cancel();
                self.getUserTimeshifts();
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
  }

  $onInit() {
    this.getWeek(this.startDate).then(() => {
      this.getUserTimeshifts();
    })
  }

}

