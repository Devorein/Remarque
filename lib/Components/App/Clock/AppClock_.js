const AppClockTransfer = require('./AppClockTransfer_');
const AppClockRestart = require('./AppClockRestart_');
const AppClockPlaypause = require('./AppClockPlaypause_');

class AppClock {
	static register() {
		[ AppClockTransfer, AppClockRestart, AppClockPlaypause ].forEach(Component => {
			Component.register();
		});
	}
}

module.exports = AppClock;
