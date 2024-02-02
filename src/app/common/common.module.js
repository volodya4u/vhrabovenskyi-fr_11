import angular from 'angular';

import footer from './components/footer/footer.component'
import navbar from './components/navbar/navbar.component'

// services
import NotifyService from './services/notify.service';
import DataService from './services/data.service';

export default angular
  .module('app.common', [])
  .component('myFooter', footer)
  .component('navbar', navbar)
  .service('NotifyService', NotifyService)
  .service('DataService', DataService);
