class GroupsButtons {
	create() {
		const _GroupsButtonsContainer = htmlElementCreation({
			id         : 'groups_buttons',
			classes    : 'buttonsContainer',
			parentElem : _groups
		});

		[ 'clock' ].forEach(button => {
			const _button = createElementFromHTML(BUTTONS[button])[0];
			_button.id = `groups_button_${button}`;
			_button.class = 'icon';
			_GroupsButtonsContainer.appendChild(_button);
		});
	}
}

module.exports = GroupsButtons;
