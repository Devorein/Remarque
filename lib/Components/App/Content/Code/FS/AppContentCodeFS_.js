const AppContentCodeFSBlock = require('./AppContentCodeFSBlock_');
const AppContentCodeFSToggle = require('./AppContentCodeFSToggle_');

class AppContentCodeFS {
	static register() {
		AppContentCodeFSBlock.register();
		AppContentCodeFSToggle.register();
	}
}

module.exports = AppContentCodeFS;
