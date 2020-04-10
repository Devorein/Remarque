const GroupsButtons = require('./Buttons/GroupsButtons_');
const GroupsContent = require('./Content/GroupsContent_');
const GroupsOverlay = require('./Overlay/GroupsOverlay_');

class Groups {
	static register() {
		[ GroupsButtons, GroupsContent, GroupsOverlay ].forEach(C => C.register());
	}
}

module.exports = Groups;
