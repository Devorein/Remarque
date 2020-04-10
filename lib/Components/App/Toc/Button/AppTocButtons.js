class AppTocButtons {
	create() {
		htmlElementCreation({
			id         : 'app_toc_buttons',
			classes    : 'buttonsContainer',
			parentElem : _app_toc,
			children   : [ 'expand', 'collapse', 'transfer', 'drag', 'toggle' ].map(button => {
				const _button = createElementFromHTML(BUTTONS[button])[0];
				_button.class = 'icon';
				if (button === 'drag') {
					return htmlElementCreation({
						id         : `app_toc_button_${button}`,
						children   : _button,
						attributes : { draggable: true }
					});
				}
				_button.id = `app_toc_button_${button}`;
				return _button;
			})
		});
	}
}

module.exports = AppTocButtons;
