const GroupsContentItem = require('./Item/GroupsContentItem');
class GroupsContent {
	create() {
		makeConstantProp(
			'_groups_content',
			htmlElementCreation({
				id         : 'groups_content',
				parentElem : _groups
			})
		);
		new GroupsContentItem().create();
	}
}

module.exports = GroupsContent;
