'use strict';

export class SearchController {
  /*@ngInject*/
  users = [];
  searchString = '';
  filteredUsers = [];

  onSearchStringChanged() {
    this.filteredUsers = this.users.filter(each => each.username === this.searchString );
  }
}

import template from './search.html';
let SearchComponent = {
  template: template,
  bindings: {users: '<'},
  controller: SearchController
  };

export default SearchComponent;
