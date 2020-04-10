const AppTocButtonCollapse = require('./AppTocButtonCollapse_');
const AppTocButtonExpand = require('./AppTocButtonExpand_');
const AppTocButtonToggle = require('./AppTocButtonToggle_');
const AppTocButtonTransfer = require('./AppTocButtonTransfer_');
const AppTocButtonDrag = require('./AppTocButtonDrag_');

class AppTocButtons {
	static register() {
		[
			AppTocButtonCollapse,
			AppTocButtonExpand,
			AppTocButtonToggle,
			AppTocButtonTransfer,
			AppTocButtonDrag
		].forEach(Component => {
			Component.register();
		});
	}
}

module.exports = AppTocButtons;
