'use strict';

juke.factory('PlayerFactory', function($http, $rootScope){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songListGlobal = null;
  var currentIndex;

  var progress = 0;
  audio.addEventListener('ended', this.next);
  audio.addEventListener('timeupdate', function () {
    progress = 100 * audio.currentTime / audio.duration;
    $rootScope.$digest();
  });
  

  return {
  	start: function(song, songList) {
  		if (this.isPlaying()) {
  			this.pause();
  		}

  		if (songList) {
  			songListGlobal = songList;
  		  currentIndex = songList.indexOf(song);
      }

  		audio.src = song.audioUrl;
  		audio.load();
  		audio.play();

  		currentSong = song;
  		playing = true;
  	},
  	pause: function() {
  		audio.pause();
  		playing = false;
  	},
  	resume: function() {
  		audio.play();
  		playing = true;
  	},
  	isPlaying: function() {
  		return playing;
  	},
  	getCurrentSong: function() {
      return currentSong;
  	},
  	next: function() {
  		if (currentIndex === songListGlobal.length - 1) {
  			currentIndex = 0;
  		} else {
  			currentIndex++;
  		}
  		this.start(songListGlobal[currentIndex]);
  	},
  	prev: function() {
		if (currentIndex === 0) {
  			currentIndex = songListGlobal.length - 1;
  		} else {
  			currentIndex--;
  		}

  		this.start(songListGlobal[currentIndex]);
  	},
  	getProgress: function() {
  		if (!playing) return 0;
      else return progress;
    },

    httpGetter: function () {
      return $http.get('/api/albums/')
      .then(res => $http.get('/api/albums/' + res.data[1]._id))
      .then(res => res.data)
      .then(album => {
        album.imageUrl = '/api/albums/' + album._id + '.image';
        album.songs.forEach(function (song, i) {
          song.audioUrl = '/api/songs/' + song._id + '.audio';
          song.albumIndex = i;
        });
        return album;
      });
    },

    albumsGetter: function() {
      return $http.get('/api/albums')
       .then(function(response) {
           return response.data.map(function(album) {
                     album.imageUrl = '/api/albums/' + album._id + '.image';
                     return album;
                 });
       });
    }
  }
});
