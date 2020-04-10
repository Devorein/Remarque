class AppTocSearchButtons {
	static click() {
		[
			'app_toc_search_button_ignorecase',
			'app_toc_search_button_code',
			'app_toc_search_button_regex',
			'app_toc_search_button_custom'
		].forEach(button => {
			const _button = document.getElementById(button);
			_button.addEventListener('click', e => {
				const status = _button.classList.toggle('activated');
				SETTINGS[button] = status;
				_app_toc_content.dispatchEvent(new CustomEvent('tocItemsChanged'));
				_app_toc_search_status.dispatchEvent(new CustomEvent('tocItemsChanged'));
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = AppTocSearchButtons;
