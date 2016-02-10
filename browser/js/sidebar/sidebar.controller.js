'use strict';

juke.controller('SidebarCtrl', function($scope, $log, $rootScope, PlayerFactory) {
  $scope.viewAlbums = function() {
  	$rootScope.$broadcast('showAlbums');
  };
});