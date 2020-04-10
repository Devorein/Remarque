const GroupsContentItemContentItem = require('./Item/GroupsContentItemContentItem_');

class GroupsContent {
	static register() {
		GroupsContentItemContentItem.register();
	}
}

module.exports = GroupsContent;
