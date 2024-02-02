export default class AuthService {
  /** @ngInject */
  constructor($cookies) {
    // DI
    this.$cookies = $cookies;
    this.key = 'auth.token';
  }

  isAuthenticated () {
    let credentials;

    credentials = this.getCredentials();

    return !!credentials.token;
  }

  setCredentials (token) {
    let expires = { expires: this.sessionTimeRange() };
    this.$cookies.put(this.key, JSON.stringify(token), expires);
  }

  sessionTimeRange() {
    let date = new Date();
    let minutes = 10;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    return date;
  }

  cleanCredentials () {
    this.$cookies.remove(this.key);
  }

  getCredentials () {
    let token;

    token = this.$cookies.get(this.key);

    if (typeof(token) !== 'undefined') {
      this.$cookies.remove(this.key);
      let someToken = JSON.parse(token);
      this.setCredentials(someToken);
      return {token: someToken}
    } else return {token: null};
  }
}