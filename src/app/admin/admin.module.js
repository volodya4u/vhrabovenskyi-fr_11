import angular from 'angular';

// components
import admin from './components/admin/admin.component'
import createUser from './components/createUser/createUser.component'
import editUser from './components/editUser/editUser.component'

// services
import UserService from './services/user.service';

export default angular
  .module('app.admin', [])
  .component('admin', admin)
  .component('createUser', createUser)
  .component('editUser', editUser)
  .service('UserService', UserService);