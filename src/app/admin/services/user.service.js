import * as HttpStatus from 'http-status-codes';

export default class UserService {
  /** @ngInject */
  constructor($http, $q, RESOURCES) {
    // DI
    this.$http = $http;
    this.$q = $q;
    this.resources = RESOURCES;
    this.headers = {
      'Accept': RESOURCES.CONTENT_TYPE,
      'API_KEY': RESOURCES.API_KEY };
  }

  getAllUsers() {
    return this.$http.get(this.resources.EMPLOYEES, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  removeUser(id) {
    return this.$http.delete(this.resources.EMPLOYEES + id, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  createUser(form) {
    let info = {
      First: form.First,
      Last: form.Last,
      Email: form.Email,
      LocationId: form.LocationId,
      Birthday: new Date(form.Birthday).toJSON(),
      Address: form.Address,
      Skype: form.Skype,
      Projects: [],
      Phone: form.Phone,
      ImageUrl: 'employee.png',
      PositionId: form.PositionId,
      Password: form.Password,
      Roles: [2],
      Id: 0
    };

    return this.$http.post(this.resources.EMPLOYEES, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }

  editUser(form) {
    let info = {
      First: form.First,
      Last: form.Last,
      Email: form.Email,
      LocationId: form.LocationId,
      Birthday: new Date(form.Birthday).toJSON(),
      Address: form.Address,
      Skype: form.Skype,
      Projects: form.Projects.map(project => project.Id),
      Phone: form.Phone,
      ImageUrl: 'employee.png',
      PositionId: form.PositionId,
      Password: form.Password,
      Roles: form.Roles.map(role => role.Id),
      Id: form.Id
    };

    return this.$http.put(this.resources.EMPLOYEES, info, { headers: this.headers })
    .then(({status, data}) => {
      if (status == HttpStatus.OK) {
        return data;
      }
    })
    .catch(error => this.$q.reject(error.data));
  }
}