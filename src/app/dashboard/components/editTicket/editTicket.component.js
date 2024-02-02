import template from './editTicket.html';

export default {
  template,
  bindings: {
    data: '=',
    text: '<',
    details: '<',
    types: '<',
    users: '<',
    edit: '&',
    cancel: '&'
  }
};
