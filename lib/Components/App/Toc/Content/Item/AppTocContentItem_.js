const AppTocContentItemToggle = require('./AppTocContentItemToggle_');
const AppTocContentItemCheck = require('./AppTocContentItemCheck_');
const AppTocContentItemContent = require('./AppTocContentItemContent_');

class AppTocContentItem {
	static register() {
		[ AppTocContentItemToggle, AppTocContentItemCheck, AppTocContentItemContent ].forEach(Component => {
			Component.register();
		});
	}
}

module.exports = AppTocContentItem;
