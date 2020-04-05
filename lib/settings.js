const { htmlElementCreation } = require('./utility');

function addSettingsPage() {
	htmlElementCreation({
		id         : 'settings',
		class      : 'page',
		parentElem : BODY
	});
}

module.exports = {
	addSettingsPage
};
