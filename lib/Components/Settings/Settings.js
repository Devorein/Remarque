class Settings {
	create() {
		const _cross = createElementFromHTML(BUTTONS['cross'])[0];

		makeConstantProp(
			'SETTINGS',
			htmlElementCreation({
				id         : 'settings',
				classes    : 'page',
				parentElem : BODY
			})
		);
		_cross.id = 'settingsPageCancel';
		SETTINGS.appendChild(_cross);
	}
}

module.exports = Settings;
