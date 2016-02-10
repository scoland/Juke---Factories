'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $log, PlayerFactory) {

  PlayerFactory.httpGetter()
               .then(album => $scope.album = album)
               .catch(function(err){$log.error(err);});

// lesson: you have to understand how the MVC mechanics work and how they reference certain data types throughout the application. Being able follow the path in which data is transfered between the M-V-C, is incredibly improtant... sean is cool... 
$scope.hasCurrentSong = PlayerFactory.getCurrentSong;

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else  {
      PlayerFactory.start(song, $scope.album.songs);
    }
    $scope.currentSong = PlayerFactory.getCurrentSong();
    $scope.playing = PlayerFactory.isPlaying();
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };

});
