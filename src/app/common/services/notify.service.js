export default class NotifyService {
  /** @ngInject */
  constructor (notify) {
    this.notifyService = notify;
  }

  info (message) {
    let config = {};
    config.message = message;
    config.classes = 'alert alert-info';
    return this.notifyService(config);
  }

  warn (message) {
    let config = {};
    config.message = message;
    config.classes = 'alert alert-warning';
    return this.notifyService(config);
  }

  error (message) {
    let config = {};
    config.message = message;
    config.classes = 'alert alert-danger';
    return this.notifyService(config);
  }

  success (message) {
    let config = {};
    config.message = message;
    config.classes = 'alert alert-success';
    return this.notifyService(config);
  }

  notify (config) {
    return this.notifyService(config);
  }

  closeAll () {
    return this.notifyService.closeAll();
  }
}