import template from './createTicket.html';

export default {
  template,
  bindings: {
    data: '=',
    text: '<',
    details: '<',
    types: '<',
    users: '<',
    create: '&',
    cancel: '&'
  }
};
