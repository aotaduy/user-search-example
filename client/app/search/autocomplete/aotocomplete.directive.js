
export default function autocompleteDirective($compile, $filter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, element, attributes, ctrl) {

      let isOpenState = true;
      // Scope bindings
      $scope.isOpen = isOpen;
      $scope.onSelectedIndex = onSelectedIndex;
      $scope.selectedIndex = 0;
      // Event bindings
      element.on('keydown', handleKeyUp);
      document.addEventListener('click', closePopup);
      window.addEventListener('resize', reposition)
      // Watch attributes
      $scope.$watch(attributes.items, onItemsChanged);
      $scope.$watch(attributes.ngModel, onItemsChanged);


      let popup = $compile(`
      <autocomplete-popup
          ng-show="isOpen()"
          items="popupItems"
          selected-index="selectedIndex"
          on-selected-index="onSelectedIndex($event)"
          display-property="${attributes.displayProperty}"> 
       </autocomplete-popup> `)($scope);
      element.after(popup);
      reposition();

      function handleKeyUp(event) {
        switch (event.which) {
        case 27: // Escape
          closePopup(event);
          break;
        case 38: //
          event.stopPropagation();
          isOpenState = true;
          $scope.selectedIndex = $scope.selectedIndex - 1 < 0 ? 0 : $scope.selectedIndex - 1 ;
          $scope.$digest();
          break;
        case 40: //
          event.stopPropagation();
          isOpenState = true;
          $scope.selectedIndex = $scope.selectedIndex + 1 >= $scope.popupItems.length ? $scope.selectedIndex : $scope.selectedIndex + 1 ;
          $scope.$digest();
          break;
        case 13: // Enter
          event.stopPropagation();
          onSelectedIndex($scope.selectedIndex)
          break;
        case 9: // Enter
          isOpenState = false;
          $scope.$digest();
          break;
        default:
          isOpenState = true;
          $scope.$digest();

        }
      }
      function reposition() {
        popup[0].style.top = element[0].clientHeight + 'px';
        popup[0].style.left = element[0].offsetLeft + 'px';
        popup[0].style.width = element[0].clientWidth + 'px';
      }
      function isOpen() {
        return isOpenState &&
          $scope.$eval(attributes.ngModel) !== '' &&
          $scope.popupItems.length > 0;
      }
      function closePopup(event){
        if(isOpen()) {
          event.stopPropagation();
          isOpenState = false;
          $scope.$digest();
        }

      }
      function onItemsChanged(newItems, oldItems) {
        if(newItems) {
          let filterObject = {};
          filterObject[attributes.displayProperty] = $scope.$eval(attributes.ngModel)
          $scope.selectedIndex = 0;
          $scope.popupItems = $filter('filter')(
            $scope.$eval(attributes.items),
            filterObject
            ).slice(0,8);
        }
      }
      function onSelectedIndex(anIndex) {
        isOpenState = false;
        ctrl.$setViewValue($scope.popupItems[anIndex][attributes.displayProperty]);
        ctrl.$render();
        $scope.$apply();
      }
    }
  };
}

autocompleteDirective.$inject = ['$compile', '$filter'];
