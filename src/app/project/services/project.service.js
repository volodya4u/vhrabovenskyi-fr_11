import * as HttpStatus from 'http-status-codes';

export default class ProjectService {
  /** @ngInject */
  constructor($http, $q, RESOURCES, moment) {
    // DI
    this.$http = $http;
    this.$q = $q;
    this.resources = RESOURCES;
    this.moment = moment;
    this.headers = {
      'Accept': RESOURCES.CONTENT_TYPE,
      'API_KEY': RESOURCES.API_KEY };
  }

  getUserProjects(id) {
    return this.$http.get(this.resources.USER_PROJECTS + id, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  getProject(id) {
    return this.$http.get(this.resources.PROJECTS + id, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  getUserTimeshifts(id, week) {
    let startDate = this.moment(week[0]).format('YYYY-MM-DD');
    let endDate = this.moment(week[week.length-1]).format('YYYY-MM-DD');
    return this.$http.get(this.resources.USER_TIMESHEETS + id
      + '&query.startDate=' + startDate
      + '&query.endDate=' + endDate, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  createTimeshifts(form, date, ticketId) {
    let info = {
      LoggedTime: form.LoggedTime,
      Date: date,
      TicketId: ticketId,
      Comment: form.Comment,
      Id: 0
    };

    return this.$http.post(this.resources.TIMESHEETS, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  editTimeshifts(form) {
    let info = {
      TicketId: form.TicketId,
      LoggedTime: form.LoggedTime,
      Date: form.Date,
      Comment: form.Comment,
      Id: form.Id
    };

    return this.$http.put(this.resources.TIMESHEETS, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

}