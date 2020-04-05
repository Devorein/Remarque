const { createElementFromHTML } = require('./utility');

const pause = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1024 1280" style="enable-background:new 0 0 1024 1024;" xml:space="preserve"><path d="M867.1,260.9c-51.4-72-123.5-127.3-206.5-157.8C575.4,71.9,480,68.8,392.7,93.7  c-84,23.9-160.5,73.8-216,141.4C119.6,304.6,85,390.1,78.2,479.9c-6.8,89.4,14.9,180.3,61.3,257c45.1,74.4,112.7,135.1,192,171  c83.8,37.9,178,48.5,268.3,30.3c86-17.4,166.1-62.1,226.7-125.5c60.8-63.7,102-145.8,115.2-232.9c3.4-22.4,5.3-45,5.3-67.6v-0.1  C946.8,422.6,919.1,333.8,867.1,260.9z M453.8,375.2v318.6c0.4,8.1-7.2,15-15,15c-0.3,0-0.6,0-0.9,0h-99.1c-8.1,0-15-6.9-15-15  c0-0.2,0-0.4,0-0.6c-0.5-14.7,0-29.5,0-44.1V330.4c0-8.1,6.9-15,15-15h100c8.1,0,15,6.9,15,15v0.6  C454.3,345.7,453.8,360.5,453.8,375.2z M700.2,375.2v318.6c0.4,8.1-7.2,15-15,15c-0.3,0-0.6,0-0.9,0h-99.1c-8.1,0-15-6.9-15-15v-0.6  c-0.5-14.7,0-29.5,0-44.1V330.4c0-8.1,6.9-15,15-15h100c8.1,0,15,6.9,15,15c0,0.2,0,0.4,0,0.6C700.7,345.7,700.2,360.5,700.2,375.2z  "/></svg>`;
const play = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1024 1280" style="enable-background:new 0 0 1024 1024;" xml:space="preserve"><g><path d="M170.2,901.4V122.6c0-31.3,34.6-50.1,60.9-33.2l604.6,389.4c24.1,15.5,24.1,50.8,0,66.4L231.1,934.6   C204.8,951.5,170.2,932.6,170.2,901.4z"/><g><path d="M185.2,901.4c0-15.2,0-30.4,0-45.6c0-38.7,0-77.4,0-116.2c0-52.5,0-105,0-157.5c0-56.5,0-113,0-169.5    c0-51,0-102.1,0-153.1c0-35.2,0-70.4,0-105.6c0-8.7,0-17.4,0-26.2c0-1.6,0-3.2,0-4.8c0-0.1,0-0.2,0-0.3c0-1.3,0.1-2.6,0.2-4    c0,0.6-0.7,2.9,0,0.2c0.4-1.6,0.7-3.2,1.3-4.8c0.3-0.8,0.5-1.5,0.8-2.3c-1.4,3.4,0.3-0.2,0.6-0.8c0.4-0.7,0.8-1.4,1.2-2    c0.4-0.6,2.8-3.5,0.4-0.8c1.3-1.5,2.6-2.9,4.1-4.2c0.6-0.5,3.6-2.5,0.6-0.6c1-0.6,1.9-1.3,2.9-1.9c1-0.6,2.1-1.1,3.1-1.6    c-0.5,0.2-3,1-0.4,0.2c1.9-0.6,3.7-1.2,5.6-1.6c0.9-0.2,4.4-0.3,0.7-0.2c1,0,2-0.1,3-0.1c1,0,2,0.1,3,0.1c2.9,0-2.4-0.8,1.4,0.2    c2.2,0.6,4.4,1.1,6.5,2c-0.7-0.3-2.4-1.3-0.1,0.1c1.1,0.7,2.3,1.3,3.4,2c0.1,0,0.1,0.1,0.2,0.1c1.4,0.9,2.8,1.8,4.2,2.7    c7.7,5,15.4,9.9,23.1,14.9c31.4,20.2,62.8,40.5,94.2,60.7c44.1,28.4,88.3,56.9,132.4,85.3c47.4,30.5,94.8,61,142.1,91.5    c41,26.4,82,52.8,123,79.2c25,16.1,50,32.2,75,48.3c4.1,2.7,8.5,5.2,12.5,8.1c-2.4-1.8,1.9,1.9,2.6,2.7c0.4,0.5,2.6,3.7,0.7,0.8    c0.6,0.8,1.1,1.7,1.6,2.5c0.5,0.9,0.9,1.8,1.4,2.6c1.9,3.3-0.7-2.8,0.3,0.8c0.7,2.3,1.3,4.5,1.7,6.8c-0.1-0.5-0.2-3.3-0.1-0.5    c0,1.2,0.1,2.3,0.1,3.5c0,0.8-0.1,1.6-0.1,2.3c0,3.8,0.8-3-0.1,0.7c-0.5,1.9-1,3.8-1.5,5.7c-1,3.6,1.5-2.5-0.3,0.8    c-0.6,1-1.1,2.1-1.7,3.1c-0.3,0.5-2.7,3.7-0.5,0.9c-0.5,0.6-1.1,1.3-1.6,1.9c-0.7,0.7-5,4.5-2.6,2.7c-0.7,0.6-1.5,1.1-2.3,1.6    c-0.4,0.3-0.9,0.6-1.3,0.9c-18,11.7-36.1,23.3-54.2,34.9c-37.1,23.9-74.1,47.7-111.2,71.6c-46.6,30-93.1,60-139.7,90    c-46.3,29.8-92.6,59.6-138.8,89.4c-36.2,23.3-72.4,46.6-108.6,70c-16.6,10.7-33.2,21.5-49.9,32.2c-0.2,0.1-0.5,0.3-0.7,0.4    c-0.7,0.5-1.5,0.9-2.3,1.4c-0.4,0.2-4.3,2-1.1,0.7c-1.9,0.8-3.9,1.4-5.9,1.8c-0.8,0.2-4.6,0.5-0.8,0.2c-0.8,0-1.6,0.1-2.4,0.2    c-1.2,0-6.8-0.5-3.1,0.1c-2.1-0.3-4.2-0.8-6.3-1.5c-0.9-0.3-1.8-0.6-2.7-1c3.5,1.4,0-0.2-0.6-0.5c-1-0.5-5.6-3.8-2.8-1.5    c-1.5-1.2-3-2.5-4.3-4c-0.1-0.1-2.5-3-1.1-1.2c1.4,1.8-0.8-1.3-0.9-1.4c-0.5-0.8-3.1-6.1-1.8-2.8c-0.8-1.9-1.4-3.9-1.8-5.9    c-0.1-0.6-0.5-4.6-0.3-1C185.3,904,185.3,902.7,185.2,901.4c-0.1-7.8-6.8-15.4-15-15c-8,0.4-15.1,6.6-15,15    c0.4,23.1,14.3,42.8,35.8,51.1c15.6,6.1,33.7,3.8,47.8-5.1c4.5-2.8,8.9-5.7,13.4-8.6c26.9-17.3,53.9-34.7,80.8-52    c42.6-27.4,85.2-54.8,127.7-82.3c48.3-31.1,96.6-62.2,144.9-93.3c43.6-28.1,87.1-56.1,130.7-84.2c29.2-18.8,58.5-37.7,87.7-56.5    c6-3.9,12-7.7,17.9-11.6c7.2-4.7,13.4-10.3,18.2-17.5c11.5-17.4,11.3-42-0.3-59.3c-6.4-9.5-15.1-15.3-24.3-21.2    c-9.3-6-18.5-11.9-27.8-17.9c-33.9-21.8-67.8-43.7-101.7-65.5c-45.7-29.4-91.3-58.8-137-88.2c-47.8-30.8-95.7-61.6-143.5-92.4    c-39.6-25.5-79.1-51-118.7-76.4c-21.4-13.8-42.7-27.5-64.1-41.3C226.9,68.9,208.1,64.5,190,72c-20.9,8.6-34.4,28-34.7,50.7    c0,1.1,0,2.2,0,3.2c0,22.4,0,44.9,0,67.3c0,44.2,0,88.4,0,132.5c0,55.3,0,110.5,0,165.8c0,56.8,0,113.6,0,170.3    c0,47.7,0,95.4,0,143.2c0,28.3,0,56.6,0,84.9c0,3.8,0,7.7,0,11.5c0,7.8,6.9,15.4,15,15C178.4,916,185.2,909.8,185.2,901.4z"/></g></g></svg>`;

let interval = null;

function displayTime() {
	++totalSeconds;
	const hours = Math.floor(totalSeconds / 3600);
	const secs_left = totalSeconds % 3600;
	const minutes = Math.floor(secs_left / 60);
	const secs = secs_left % 60;
	_clockContainer.querySelector('#clock').textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10
		? '0' + minutes
		: minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function play_pause_clockListener() {
	_clockPlayPause.addEventListener('click', e => {
		const clockState = window.localStorage.getItem('clockState') === 'pause' ? 'play' : 'pause';
		window.localStorage.setItem('clockState', clockState);
		play_pause_clockHandler();
	});
}

function play_pause_clockHandler() {
	const isPlaying = window.localStorage.getItem('clockState') === 'pause';
	if (_clockPlayPause.firstElementChild) _clockPlayPause.removeChild(_clockPlayPause.firstElementChild);
	if (isPlaying) {
		_clockPlayPause.append(createElementFromHTML(play));
		handleTimer('play');
	}
	else {
		_clockPlayPause.append(createElementFromHTML(pause));
		handleTimer('pause');
	}
}

function restart_clockIHandler() {
	_clockRestart.addEventListener('click', e => {
		window.totalSeconds = -1;
		window.localStorage.setItem('totalSeconds', 0);
		displayTime();
	});
}

function handleTimer(state) {
	if (state === 'play') interval = setInterval(displayTime, 1000);
	else if (state == 'pause') {
		displayTime();
		clearInterval(interval);
	}
}

function clockPositionListener() {
	_clockPosition.addEventListener('click', e => {
		_clockContainer.style.transition = 'left 250ms ease-in-out';
		setTimeout(() => {
			_clockContainer.style.transition = 'transform 250ms ease-in-out';
		}, 500);
		const clockPosition = window.localStorage.getItem('clockPosition');
		if (clockPosition === 'left') window.localStorage.setItem('clockPosition', 'right');
		else if (clockPosition === 'right') window.localStorage.setItem('clockPosition', 'left');
		clockPositionHandler();
	});
}

function clockPositionHandler() {
	const clockPosition = window.localStorage.getItem('clockPosition');
	const tocSize = window.localStorage.getItem('tocSize');
	const tocPosition = window.localStorage.getItem('tocPosition');
	if (tocPosition === 'left' && clockPosition === 'left') _clockContainer.style.left = `${parseInt(tocSize) + 40}px`;
	else if (tocPosition === 'left' && clockPosition === 'right') _clockContainer.style.left = `calc(100% - 80px)`;
	else if (tocPosition === 'right' && clockPosition === 'left') _clockContainer.style.left = `10px`;
	else if (tocPosition === 'right' && clockPosition === 'right')
		_clockContainer.style.left = `calc(100% - ${parseInt(tocSize) + 110}px)`;
}

module.exports = {
	displayTime,
	play_pause_clockListener,
	play_pause_clockHandler,
	restart_clockIHandler,
	clockPositionListener,
	clockPositionHandler
};
