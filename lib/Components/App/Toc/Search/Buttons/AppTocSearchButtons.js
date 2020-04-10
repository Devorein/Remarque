class AppTocSearchButtons {
	create() {
		const _appTocSearchButtonsContainer = htmlElementCreation({
			id         : 'app_toc_search_buttons',
			classes    : 'buttonsContainer',
			parentElem : _app_toc_search
		});

		[ 'code', 'custom', 'ignorecase', 'regex' ].forEach(button => {
			const _button = createElementFromHTML(BUTTONS[button])[0];
			_button.id = `app_toc_search_button_${button}`;
			_button.class = 'icon';
			_appTocSearchButtonsContainer.append(_button);
		});
	}
}

module.exports = AppTocSearchButtons;
