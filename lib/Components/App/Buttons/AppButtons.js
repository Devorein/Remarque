class AppButtons {
	create() {
		const _appButtonsContainer = htmlElementCreation({
			id         : 'app_buttons',
			classes    : 'buttonsContainer',
			parentElem : _app
		});

		[ 'clock', 'progress', 'zen' ].forEach(button => {
			const _button = createElementFromHTML(BUTTONS[button])[0];
			_button.id = `app_button_${button}`;
			_button.class = 'icon';
			_appButtonsContainer.appendChild(_button);
		});
	}
}

module.exports = AppButtons;
