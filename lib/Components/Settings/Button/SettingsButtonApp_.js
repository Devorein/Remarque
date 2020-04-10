class SettingsButtonApp {
	static click() {
		_settings_button_app.addEventListener('click', e => {
			_app.style.left = '0%';
			_settings.style.left = '-100%';
			SETTINGS['__currentPage'] = 'app';
		});
	}

	static register() {
		SettingsButtonApp.click();
	}
}

module.exports = SettingsButtonApp;
