import angular from 'angular';
import 'angular-mocks';

import './app.module';

describe('application module', () => {
  it('registers the root AngularJS module', () => {
    expect(angular.module('app').name).toBe('app');
  });

  describe('when loaded', () => {
    beforeEach(angular.mock.module('app'));

    it('resolves its dependencies and provides the API resources', angular.mock.inject((RESOURCES) => {
      expect(RESOURCES.LOGIN_USER).toBe(RESOURCES.EMPLOYEES + 'login');
    }));
  });
});
