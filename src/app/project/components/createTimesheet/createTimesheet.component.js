import template from './createTimesheet.html';

export default {
  template,
  bindings: {
    data: '=',
    pattern: '<',
    create: '&',
    cancel: '&'
  }
};
