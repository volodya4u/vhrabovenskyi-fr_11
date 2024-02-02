import angular from 'angular';

// components
import project from './components/project/project.component';
import createTimesheet from './components/createTimesheet/createTimesheet.component';
import editTimesheet from './components/editTimesheet/editTimesheet.component';

// services
import ProjectService from './services/project.service';

export default angular
  .module('app.project', [])
  .component('project', project)
  .component('createTimesheet', createTimesheet)
  .component('editTimesheet', editTimesheet)
  .service('ProjectService', ProjectService);
