export default class DataService {
  /** @ngInject */
  constructor($http) {
    // DI
    this.$http = $http;
  }

  getLocations() {
    return this.$http.get('assets/mockData/location.json').then(({data}) => data);
  }

  getPositions() {
    return this.$http.get('assets/mockData/position.json').then(({data}) => data);
  }

  getTicketStatus() {
    return this.$http.get('assets/mockData/ticketStatus.json').then(({data}) => data);
  }

  getTicketType() {
    return this.$http.get('assets/mockData/ticketType.json').then(({data}) => data);
  }
}
