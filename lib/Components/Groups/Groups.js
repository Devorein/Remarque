const GroupsOverlay = require('./Overlay/GroupsOverlay');
const GroupsContent = require('./Content/GroupsContent');
const GroupsButtons = require('./Buttons/GroupsButtons');

class Groups {
	create() {
		makeConstantProp(
			'_groups',
			htmlElementCreation({
				id         : 'groups',
				classes    : 'page',
				parentElem : BODY
			})
		);
		[ GroupsOverlay, GroupsContent, GroupsButtons ].forEach(C => new C().create());
	}
}

module.exports = Groups;
