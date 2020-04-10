let interval;

class AppClockPlaypause {
	static clickH() {
		const isPlaying = SETTINGS['app_clock__state'];
		if (isPlaying) {
			_app_clock_playpause.children[0].style.display = 'initial';
			_app_clock_playpause.children[1].style.display = 'none';
			interval = setInterval(displayTime, 1000);
		}
		else {
			_app_clock_playpause.children[0].style.display = 'none';
			_app_clock_playpause.children[1].style.display = 'initial';
			displayTime();
			clearInterval(interval);
		}
	}

	static click() {
		_app_clock_playpause.addEventListener('click', e => {
			SETTINGS['app_clock__state'] = !SETTINGS['app_clock__state'];
			this.clickH();
		});
	}

	static register() {
		AppClockPlaypause.click();
	}
}

module.exports = AppClockPlaypause;
