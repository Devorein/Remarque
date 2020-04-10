const AppContentCodeExpBlockLine = require('./AppContentCodeExpBlockLine_');

class AppContentCodeExpBlock {
	static register() {
		AppContentCodeExpBlockLine.register();
	}
}

module.exports = AppContentCodeExpBlock;
