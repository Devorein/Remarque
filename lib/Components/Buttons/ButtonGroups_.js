class ButtonGroups {
	static click() {
		_button_groups.addEventListener('click', e => {
			_app.style.left = '100%';
			_groups.style.left = '0%';
			SETTINGS['__currentPage'] = 'groups';
		});
	}
	static register() {
		this.click();
	}
}

module.exports = ButtonGroups;
