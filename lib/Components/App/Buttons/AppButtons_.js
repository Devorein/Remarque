const AppButtonClock = require('./AppButtonClock_');
const AppButtonProgress = require('./AppButtonProgress_');
const AppButtonZen = require('./AppButtonZen_');

class AppButtons {
	static register() {
		[ AppButtonClock, AppButtonProgress, AppButtonZen ].forEach(Component => {
			Component.register();
		});
	}
}

module.exports = AppButtons;
