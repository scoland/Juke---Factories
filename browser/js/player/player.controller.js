'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)

  // audio.addEventListener('ended', $scope.next);

  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   $scope.$digest(); // no Angular-aware code is doing this for us here
  // });

  // state

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) {
     PlayerFactory.pause();
    }  else {
      PlayerFactory.start(song);
    }
      $scope.currentSong = PlayerFactory.getCurrentSong();
      $scope.playing = PlayerFactory.isPlaying();
  }

  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.prev;
  
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


