'use strict';

export default class SearchService {
  // AngularJS will instantiate a singleton by calling "new" on this class
  constructor($http) {
    this.http = $http;
  }
  getUsers() {
    return this.http.get('/assets/users.json');
  }
}

SearchService.$inject = ['$http']
