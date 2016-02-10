'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

// initialize audio player (note this kind of DOM stuff is odd for Angular)

// state
$scope.hasCurrentSong = PlayerFactory.getCurrentSong;
$scope.ctrlGetProgress = PlayerFactory.getProgress;
$scope.next = PlayerFactory.next.bind(PlayerFactory);
$scope.prev = PlayerFactory.prev.bind(PlayerFactory);
$scope.isPlaying = PlayerFactory.isPlaying;

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    }  else {
      PlayerFactory.start(song);
    }
    $scope.currentSong = PlayerFactory.getCurrentSong();
    $scope.playing = PlayerFactory.isPlaying();
  };
 
});

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
    // audio.pause();
    // $scope.playing = false;
  // }
  // function play (event, song){
    // stop existing audio (e.g. other song) in any case
    // pause();
    // $scope.playing = true;
    // resume current song
    // if (song === $scope.currentSong) return audio.play();
    // enable loading new song
    // $scope.currentSong = song;
    // audio.src = song.audioUrl;
    // audio.load();
    // audio.play();
  // }

  // outgoing events (to Album… or potentially other characters)


