class ButtonSettings {
	static click() {
		_button_settings.addEventListener('click', e => {
			_app.style.left = '100%';
			_settings.style.left = '0%';
			SETTINGS['__currentPage'] = 'settings';
		});
	}
	static register() {
		this.click();
	}
}

module.exports = ButtonSettings;
