import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');

const THROTTLE_DELAY = 1000; // Мілісекунди для lodash.throttle

vimeoPlayer.on('timeupdate', throttle(function(event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}, THROTTLE_DELAY));

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
});

