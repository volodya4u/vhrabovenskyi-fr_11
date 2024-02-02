import angular from 'angular';

import dashboard from './components/dashboard/dashboard.component';
import createTicket from './components/createTicket/createTicket.component';
import editTicket from './components/editTicket/editTicket.component';

// services
import TicketService from './services/ticket.service';

export default angular
  .module('app.dashboard', [])
  .component('dashboard', dashboard)
  .component('createTicket', createTicket)
  .component('editTicket', editTicket)
  .service('TicketService', TicketService);
