const AppContentCodeFS = require('./FS/AppContentCodeFS_');
const AppContentCodeOutput = require('./Output/AppContentCodeOutput_');
const AppContentCodeCode = require('./Code/AppContentCodeCode_');
const AppContentCodeExp = require('./Exp/AppContentCodeExp_');

class AppContentCode {
	static register() {
		[ AppContentCodeFS, AppContentCodeExp, AppContentCodeOutput, AppContentCodeCode ].forEach(Component => {
			Component.register();
		});
	}
}

module.exports = AppContentCode;
