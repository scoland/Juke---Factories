'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songListGlobal = null;
  var currentIndex;

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

  		this.start(songListGlobal[currentIndex])
  	},
  	previous: function() {
		if (currentIndex === 0) {
  			currentIndex = songListGlobal.length - 1;
  		} else {
  			currentIndex--;
  		}

  		this.start(songListGlobal[currentIndex])
  	},
  	getProgress: function() {
  		if (!playing) return 0;

  		return audio.currentTime / audio.duration;
  	}
  }
});
