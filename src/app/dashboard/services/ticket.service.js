import * as HttpStatus from 'http-status-codes';

export default class TicketService {
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

  getProjectTickets(id) {
    return this.$http.get(this.resources.PROJECT_TASKS + id, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  editTicketStatus(ticket, index) {
    let info = {
      Name: ticket.Name,
      Description: ticket.Description,
      Estimate: ticket.Estimate,
      StartDate: ticket.StartDate,
      EndDate: index === 4 ? new Date().toJSON() : null,
      StatusId: index + 1,
      ResponsibleId: ticket.ResponsibleId,
      TypeId: ticket.TypeId,
      ProjectId: ticket.ProjectId,
      ReporterId: ticket.ReporterId,
      Id: ticket.Id
    }

    return this.$http.put(this.resources.TASKS, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  editTicket(ticket) {
    let info = {
      Name: ticket.Name,
      Description: ticket.Description,
      Estimate: ticket.Estimate,
      StartDate: ticket.StartDate,
      EndDate: ticket.EndDate,
      StatusId: ticket.StatusId,
      ResponsibleId: ticket.ResponsibleId,
      TypeId: ticket.TypeId,
      ProjectId: ticket.ProjectId,
      ReporterId: ticket.ReporterId,
      Id: ticket.Id
    }

    return this.$http.put(this.resources.TASKS, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  createTicket(ticket, projectId, userId) {
    let info = {
      Name: ticket.Name,
      Description: ticket.Description,
      Estimate: ticket.Estimate,
      StartDate: new Date().toJSON(),
      EndDate: null,
      StatusId: 1,
      ResponsibleId: ticket.ResponsibleId,
      TypeId: ticket.TypeId,
      ProjectId: projectId,
      ReporterId: userId,
      Id: 0
    }

    return this.$http.post(this.resources.TASKS, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  removeTicket(id) {
    return this.$http.delete(this.resources.TASKS + id, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

}