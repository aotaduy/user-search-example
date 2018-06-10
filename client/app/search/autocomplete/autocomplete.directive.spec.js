'use strict';
import angular from 'angular';
import searchModule from '../search.module';

describe('Directive: autocomplete', function() {
  // load the component's module
  var searchComponent;
  var element;

  beforeEach(angular.mock.module(searchModule));
  beforeEach(angular.mock.module('stateMock'));

  it('should search one element', inject(function($rootScope, $compile) {
    let scope = $rootScope.$new();
    scope.searchString = '';
    scope.items = [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
      {id: 3, name: 'test3'},
    ];
    element = $compile(`<input type="text"
                       ng-model="searchString"
                       autocomplete
                       items="items"
                       display-property="name"
                >`)(scope);
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    expect(scope.popupItems.length).to.equal(3);
    scope.searchString = 'test2';
    scope.$digest();
    expect(scope.popupItems.length).to.equal(1);
    expect(scope.popupItems[0].id).to.equal(2);
   // browserTrigger(element, 'click');
  }));

  it('should search change selection and navigate using keys', inject(function($rootScope, $compile) {
    let scope = $rootScope.$new();
    scope.searchString = '';
    scope.items = [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
      {id: 3, name: 'test3'},
    ];
    element = $compile(`<input type="text"
                       ng-model="searchString"
                       autocomplete
                       items="items"
                       display-property="name"
                >`)(scope);
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    expect(scope.popupItems.length).to.equal(3);
    browserTrigger(element, 'keydown', {which: 40});
    scope.$digest();
    expect(scope.selectedIndex).to.equal(1);
    browserTrigger(element, 'keydown', {which: 38});
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    browserTrigger(element, 'keydown', {which: 38});
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    browserTrigger(element, 'keydown', {which: 40});
    browserTrigger(element, 'keydown', {which: 40});
    expect(scope.selectedIndex).to.equal(2);
    scope.$digest();
    browserTrigger(element, 'keydown', {which: 40});
    scope.$digest();
    browserTrigger(element, 'keydown', {which: 40});
    scope.$digest();
    expect(scope.selectedIndex).to.equal(2);
    browserTrigger(element, 'keydown', {which: 13});
    scope.$digest();
    expect(scope.searchString).to.equal('test3');
  }));

  it('should not change selection using tab', inject(function($rootScope, $compile) {
    let scope = $rootScope.$new();
    scope.searchString = '';
    scope.items = [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
      {id: 3, name: 'test3'},
    ];
    element = $compile(`<input type="text"
                       ng-model="searchString"
                       autocomplete
                       items="items"
                       display-property="name"
                >`)(scope);
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    expect(scope.popupItems.length).to.equal(3);
    browserTrigger(element, 'keydown', {which: 40});
    scope.$digest();
    expect(scope.selectedIndex).to.equal(1);
    browserTrigger(element, 'keydown', {which: 9});
    scope.$digest();
    expect(scope.searchString).to.equal('');
  }));


  it('should search not change selection using esc', inject(function($rootScope, $compile) {
    let scope = $rootScope.$new();
    scope.searchString = '';
    scope.items = [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
      {id: 3, name: 'test3'},
    ];
    element = $compile(`<input type="text"
                       ng-model="searchString"
                       autocomplete
                       items="items"
                       display-property="name"
                >`)(scope);
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    expect(scope.popupItems.length).to.equal(3);
    browserTrigger(element, 'keydown', {which: 40});
    scope.$digest();
    expect(scope.selectedIndex).to.equal(1);
    browserTrigger(element, 'keydown', {which: 27});
    scope.$digest();
    expect(scope.searchString).to.equal('');
    browserTrigger(element, 'keydown', {which: 27});
    scope.$digest();
    expect(scope.searchString).to.equal('');
  }));

  it('should search by change on ngModel', inject(function($rootScope, $compile) {
    let scope = $rootScope.$new();
    scope.searchString = '';
    scope.items = [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
      {id: 3, name: 'test3'},
    ];
    element = $compile(`<input type="text"
                       ng-model="searchString"
                       autocomplete
                       items="items"
                       display-property="name"
                >`)(scope);
    scope.$digest();
    expect(scope.selectedIndex).to.equal(0);
    expect(scope.popupItems.length).to.equal(3);
    scope.searchString = '1';
    scope.$digest();
    expect(scope.popupItems.length).to.equal(1);

  }));
});
