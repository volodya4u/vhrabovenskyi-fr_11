import * as HttpStatus from 'http-status-codes';
export default authInterceptor;

/** @ngInject */
function authInterceptor($httpProvider) {
  $httpProvider.interceptors.push(($q, $location) => {
    return {
      responseError(response) {
        const {status} = response;
        if (status === HttpStatus.UNAUTHORIZED) {
          $location.path('/401');
          
        } else if (status === HttpStatus.NOT_FOUND || status === HttpStatus.BAD_REQUEST) {
          $location.path('/404');
        }

        return $q.reject(response);
      }
    };
  });
}
