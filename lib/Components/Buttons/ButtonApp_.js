class ButtonApp {
	static click() {
		_button_app.addEventListener('click', e => {
			_app.style.left = '100%';
			_groups.style.left = '0%';
			SETTINGS['__currentPage'] = 'app';
		});
	}
	static register() {
		this.click();
	}
}

module.exports = ButtonApp;
