class AppButtonClock {
	static clickH() {
		const { app_button_clock } = SETTINGS;
		if (app_button_clock) _app_clock.style.top = `calc(100% - 75px)`;
		else _app_clock.style.top = `100%`;
	}

	static click() {
		_app_button_clock.addEventListener('click', e => {
			_app_button_clock.classList.toggle('activated');
			SETTINGS['app_button_clock'] = !SETTINGS['app_button_clock'];
			AppButtonClock.clickH();
			_app_button_zen.dispatchEvent(new CustomEvent('zenChanged'));
		});
	}
	static register() {
		AppButtonClock.click();
	}
}

module.exports = AppButtonClock;
