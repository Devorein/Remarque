const { htmlElementCreation, makeConstantProp } = require('./utility');

function addSettingsPage() {
	makeConstantProp(
		'SETTINGS',
		htmlElementCreation({
			id         : 'settings',
			classes    : 'page',
			parentElem : BODY
		})
	);
}

module.exports = {
	addSettingsPage
};
