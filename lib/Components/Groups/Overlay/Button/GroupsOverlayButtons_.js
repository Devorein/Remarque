const GroupsOverlayButtonClose = require('./GroupsOverlayButtonClose_');
const GroupsOverlayButtonPrev = require('./GroupsOverlayButtonPrev_');
const GroupsOverlayButtonPrevunique = require('./GroupsOverlayButtonPrevunique_');
const GroupsOverlayButtonNext = require('./GroupsOverlayButtonNext_');
const GroupsOverlayButtonNextunique = require('./GroupsOverlayButtonNextunique_');

class GroupsOverlayButton {
	static register() {
		window.lastBlockSelected = 0;
		[
			GroupsOverlayButtonClose,
			GroupsOverlayButtonPrev,
			GroupsOverlayButtonPrevunique,
			GroupsOverlayButtonNext,
			GroupsOverlayButtonNextunique
		].forEach(C => {
			C.register();
		});
	}
}

module.exports = GroupsOverlayButton;
