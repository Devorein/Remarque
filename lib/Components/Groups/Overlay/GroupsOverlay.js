class GroupsOverlay {
	create() {
		const _nextButton = createElementFromHTML(BUTTONS['arrow'])[0];
		_nextButton.id = 'groups_overlay_button_next';
		const _prevButton = createElementFromHTML(BUTTONS['arrow'])[0];
		_prevButton.id = 'groups_overlay_button_prev';
		const _nextuniqButton = createElementFromHTML(BUTTONS['arrow'])[0];
		_nextuniqButton.id = 'groups_overlay_button_nextuniq';
		const _prevuniqButton = createElementFromHTML(BUTTONS['arrow'])[0];
		_prevuniqButton.id = 'groups_overlay_button_prevuniq';
		const _closeButton = createElementFromHTML(BUTTONS['cross'])[0];
		_closeButton.id = 'groups_overlay_button_close';

		htmlElementCreation({
			id         : 'groups_overlay',
			children   : [
				htmlElementCreation({
					id       : 'groups_overlay_buttons',
					children : [ _prevButton, _prevuniqButton, _closeButton, _nextuniqButton, _nextButton ]
				}),
				htmlElementCreation({
					id : 'groups_overlay_counter'
				}),
				htmlElementCreation({
					id : 'groups_overlay_content'
				})
			],
			parentElem : _groups
		});
	}
}
module.exports = GroupsOverlay;
