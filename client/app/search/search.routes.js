'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    component: 'search',
    resolve: {users: searchResolve}
  });

  function searchResolve(searchService) {
    return searchService.getUsers().then(response => response.data);
  }

  searchResolve.$inject = ['searchService'];
}
