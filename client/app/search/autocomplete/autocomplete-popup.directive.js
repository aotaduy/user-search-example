'use strict';

export class AutoCompletePopupController {
  /*@ngInject*/
  selectedIndex;
  items = [];
  onSelectedIndex;
  selectedIndex;
  displayProperty;
  constructor() {
    console.log(this);
  }

  onItemClicked(index) {
    this.onSelectedIndex({$event: index});
  }
  dismiss() {

  }
}

import template from './autocomplete-popup.html';
console.log(template);
let AutocompletePopupComponent = {
  template: template,
  bindings: {
    items: '<',
    selectedIndex: '=',
    displayProperty: '@',
    onSelectedIndex: '&'
  },
  controller: AutoCompletePopupController
};


export default AutocompletePopupComponent;
