'use strict';

juke.controller('AlbumsCtrl', function($scope, $log, $rootScope, PlayerFactory) {
  $scope.showMe = false;

  PlayerFactory.albumsGetter()
    .then(function(albums){
      $scope.albums = albums
    })
    .catch($log.error);

    $rootScope.$on('showAlbums', function() {
      $scope.showMe = true;
    });
});