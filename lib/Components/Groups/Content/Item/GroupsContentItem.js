class GroupsContentItem {
	static append(type, p) {
		htmlElementCreation({
			textContent : p.textContent,
			classes     : `groups_content_item_content_item`,
			parentElem  : document.getElementById(`groups_content_${type}_item_content`)
		});
	}

	create() {
		const groups = [ 'definition', 'example', 'important', 'info', 'note', 'syntax', 'tip', 'warning' ];

		groups.forEach(group => {
			_groups_content.appendChild(
				htmlElementCreation({
					id       : `groups_content_${group}_item`,
					classes  : `groups_content_item`,
					children : [
						htmlElementCreation({
							type        : 'h1',
							id          : `groups_content_${group}_item_header`,
							classes     : `groups_content_item_header`,
							textContent : group.toUpperCase()
						}),
						htmlElementCreation({
							id      : `groups_content_${group}_item_content`,
							classes : `groups_content_item_content`
						})
					]
				})
			);
		});
	}
}

module.exports = GroupsContentItem;
