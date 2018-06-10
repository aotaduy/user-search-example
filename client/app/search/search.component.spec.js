'use strict';
import angular from 'angular';
import searchModule from './search.module';
import users from './search.mock';

describe('Component: search', function() {
  // load the component's module
  var searchComponent;
  var $componentController;

  beforeEach(angular.mock.module(searchModule));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should find a user by username', function() {
    searchComponent = $componentController('search', null, {users: users});
    searchComponent.users = users;
    searchComponent.searchString = 'aruiz5';
    searchComponent.onSearchStringChanged();
    expect(searchComponent.filteredUsers[0].username).to.equal('aruiz5');
  });

  it('should not find an incorrect user by username', function() {
    searchComponent = $componentController('search', null, {users: users});
    searchComponent.users = users;
    searchComponent.searchString = 'aruiz51112';
    searchComponent.onSearchStringChanged();
    expect(searchComponent.filteredUsers.length).to.equal(0);
  });
});
