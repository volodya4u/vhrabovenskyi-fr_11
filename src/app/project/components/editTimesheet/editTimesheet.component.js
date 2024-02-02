import template from './editTimesheet.html';

export default {
  template,
  bindings: {
    data: '=',
    pattern: '<',
    edit: '&',
    cancel: '&'
  }
};
