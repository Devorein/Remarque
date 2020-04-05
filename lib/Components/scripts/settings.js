function settings_page_CancelIHandler() {
	_settingsPageCancel.addEventListener('click', e => {
		_APP.style.left = '0%';
		_SETTINGS.style.left = '-100%';
	});
}

module.exports = {
	settings_page_CancelIHandler
};
