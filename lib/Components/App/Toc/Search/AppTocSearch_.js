const AppTocSearchButtons = require('./Buttons/AppTocSearchButtons_');
const AppTocSearchStatus = require('./AppTocSearchStatus_');
const AppTocSearchInput = require('./AppTocSearchInput_');

class AppTocSearch {
	static register() {
		[ AppTocSearchButtons, AppTocSearchStatus, AppTocSearchInput ].forEach(C => C.register());
	}
}

module.exports = AppTocSearch;
