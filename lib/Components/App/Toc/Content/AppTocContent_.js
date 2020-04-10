const AppTocContentItem = require('./Item/AppTocContentItem_');

class AppTocContent {
	static tocItemsChangedH() {
		const {
			app_toc_search_button_regex,
			app_toc_search_button_code,
			app_toc_search_button_custom,
			app_toc_search_button_ignorecase,
			app_toc_search_input__value
		} = SETTINGS;

		let _shown_items = _app_toc_contents.map(_toc_content => {
			if (app_toc_search_button_regex && app_toc_search_button_ignorecase) {
				if (new RegExp(app_toc_search_input__value, 'i').test(_toc_content.textContent)) {
					_toc_content.parentElement.style.display = 'flex';
					return _toc_content;
				}
				else _toc_content.parentElement.style.display = 'none';
			}
			else if (app_toc_search_button_regex && !app_toc_search_button_ignorecase) {
				if (new RegExp(app_toc_search_input__value).test(_toc_content.textContent)) {
					_toc_content.parentElement.style.display = 'flex';
					return _toc_content;
				}
				else _toc_content.parentElement.style.display = 'none';
			}
			else if (!app_toc_search_button_regex && app_toc_search_button_ignorecase) {
				if (_toc_content.textContent.toLowerCase().includes(app_toc_search_input__value.toLowerCase())) {
					_toc_content.parentElement.style.display = 'flex';
					return _toc_content;
				}
				else _toc_content.parentElement.style.display = 'none';
			}
			else if (!app_toc_search_button_regex && !app_toc_search_button_ignorecase) {
				if (_toc_content.textContent.includes(app_toc_search_input__value)) {
					_toc_content.parentElement.style.display = 'flex';
					return _toc_content;
				}
				else _toc_content.parentElement.style.display = 'none';
			}
		});

		if (app_toc_search_button_code) {
			_shown_items = _shown_items.map(_shown_item => {
				if (_shown_item.textContent.includes('❰ ❱')) {
					_shown_item.parentElement.style.display = 'flex';
					return _shown_item;
				}
				else _shown_item.parentElement.style.display = 'none';
			});
		}

		if (app_toc_search_button_custom) {
			_shown_items = _shown_items.map(_shown_item => {
				if (_shown_item.textContent.includes('➥')) {
					_shown_item.parentElement.style.display = 'flex';
					return _shown_item;
				}
				else _shown_item.parentElement.style.display = 'none';
			});
		}
	}

	static tocItemsChanged() {
		_app_toc_content.addEventListener('tocItemsChanged', () => {
			this.tocItemsChangedH();
		});
	}

	static register() {
		AppTocContent.tocItemsChanged();
		AppTocContentItem.register();
	}
}

module.exports = AppTocContent;
