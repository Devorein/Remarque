class AppClockRestart {
	static click() {
		_app_clock_restart.addEventListener('click', e => {
			SETTINGS['__totalSeconds'] = 0;
			displayTime();
		});
	}

	static register() {
		AppClockRestart.click();
	}
}

module.exports = AppClockRestart;
