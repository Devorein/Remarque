const { htmlElementCreation, makeConstantProp } = require('../../utility');
const { getSVGData } = require('../../file');

function addSettingsPage() {
	const _crossContainer = document.createElement('div');
	_crossContainer.innerHTML = getSVGData('cross');
	const _cross = _crossContainer.children[0];

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

module.exports = {
	addSettingsPage
};
