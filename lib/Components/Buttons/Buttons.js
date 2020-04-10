class Buttons {
	create() {
		const _buttonsContainer = htmlElementCreation({
			id         : 'buttons',
			parentElem : BODY
		});

		const _light_icon = createElementFromHTML(BUTTONS['light'])[0];
		_light_icon.id = 'button_theme_light';
		_light_icon.class = 'icon';
		const _dark_icon = createElementFromHTML(BUTTONS['dark'])[0];
		_dark_icon.id = 'button_theme_dark';
		_dark_icon.class = 'icon';

		_buttonsContainer.append(
			htmlElementCreation({
				id       : 'button_theme',
				children : [ _light_icon, _dark_icon ]
			})
		);

		[ 'settings', 'groups', 'app' ].forEach(button => {
			const _button = createElementFromHTML(BUTTONS[button])[0];
			_button.id = `button_${button}`;
			_button.class = 'icon';
			_buttonsContainer.appendChild(_button);
		});
	}
}

module.exports = Buttons;
