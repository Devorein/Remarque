class ButtonTheme {
	static clickH() {
		const { __theme } = SETTINGS;
		if (__theme === 'dark') {
			_body.classList.remove('light');
			_body.classList.add('dark');
			_button_theme_light.style.display = 'none';
			_button_theme_dark.style.display = 'inherit';
		}
		else if (__theme === 'light') {
			_body.classList.remove('dark');
			_body.classList.add('light');
			_button_theme_dark.style.display = 'none';
			_button_theme_light.style.display = 'inherit';
		}
	}

	static click() {
		_button_theme.addEventListener('click', () => {
			SETTINGS['__theme'] = SETTINGS['__theme'] === 'light' ? 'dark' : 'light';
			this.clickH();
		});
	}

	static register() {
		this.click();
	}
}

module.exports = ButtonTheme;
