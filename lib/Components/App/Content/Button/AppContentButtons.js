class AppContentButtons {
	create() {
		const _appContentButtonsContainer = htmlElementCreation({
			id         : 'app_content_buttons',
			classes    : 'buttonsContainer',
			parentElem : _app_content
		});

		[ 'top', 'bottom', 'download' ].forEach(button => {
			const _button = createElementFromHTML(BUTTONS[button])[0];
			_button.id = `app_content_button_${button}`;
			_button.class = 'icon';
			_appContentButtonsContainer.appendChild(_button);
		});
	}
}

module.exports = AppContentButtons;
