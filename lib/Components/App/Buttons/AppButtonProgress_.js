class AppButtonProgress {
	static clickH() {
		const { app_button_progress } = SETTINGS;
		if (app_button_progress) _app_progress.style.top = `25px`;
		else _app_progress.style.top = `-50px`;
	}

	static click() {
		_app_button_progress.addEventListener('click', e => {
			_app_button_progress.classList.toggle('activated');
			SETTINGS['app_button_progress'] = !SETTINGS['app_button_progress'];
			AppButtonProgress.clickH();
			_app_button_zen.dispatchEvent(new CustomEvent('zenChanged'));
		});
	}

	static register() {
		AppButtonProgress.click();
	}
}

module.exports = AppButtonProgress;
