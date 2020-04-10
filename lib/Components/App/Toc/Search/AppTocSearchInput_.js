class AppTocSearchInput {
	static input() {
		_app_toc_search_input.addEventListener('input', e => {
			SETTINGS['app_toc_search_input__value'] = e.target.value;
			_app_toc_content.dispatchEvent(new CustomEvent('tocItemsChanged'));
			_app_toc_search_status.dispatchEvent(new CustomEvent('tocItemsChanged'));
		});
	}
	static register() {
		AppTocSearchInput.input();
	}
}

module.exports = AppTocSearchInput;
