const AppContentCodeOutputBlockLine = require('./AppContentCodeOutputBlockLine_');

class AppContentCodeOutputBlock {
	static register() {
		AppContentCodeOutputBlockLine.register();
	}
}

module.exports = AppContentCodeOutputBlock;
