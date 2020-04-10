const GroupsOverlayButtons = require('./Button/GroupsOverlayButtons_');
const GroupsOverlayCounter = require('./GroupsOverlayCounter_');
class GroupsOverlay {
	static register() {
		GroupsOverlayButtons.register();
		GroupsOverlayCounter.register();
	}
}

module.exports = GroupsOverlay;
