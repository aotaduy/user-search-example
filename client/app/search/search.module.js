import routing from './search.routes';
import angular from 'angular';
import SearchComponent from './search.component';
import SearchService from './search.service';
import uiRouter from 'angular-ui-router';
import autocompleteDirective from './autocomplete/aotocomplete.directive';
import AutocompletePopupComponent from './autocomplete/autocomplete-popup.directive';

export default angular.module('userSearchApp.search', [uiRouter])
  .config(routing)
  .component('autocompletePopup', AutocompletePopupComponent)
  .directive('autocomplete', autocompleteDirective)
  .service('searchService', SearchService)
  .component('search', SearchComponent)
  .name;


