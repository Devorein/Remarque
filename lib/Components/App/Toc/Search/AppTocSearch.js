const AppTocSearchButtons = require('./Buttons/AppTocSearchButtons');
const AppTocSearchInput = require('./AppTocSearchInput');
const AppTocSearchStatus = require('./AppTocSearchStatus');

class AppTocSearch {
	create() {
		makeConstantProp(
			'_app_toc_search',
			htmlElementCreation({
				id         : 'app_toc_search',
				parentElem : _app_toc
			})
		);

		new AppTocSearchInput().create();
		new AppTocSearchStatus().create();
		new AppTocSearchButtons().create();
	}
}

module.exports = AppTocSearch;
