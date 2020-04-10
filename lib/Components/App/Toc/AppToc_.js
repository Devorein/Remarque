const AppTocButtons = require('./Button/AppTocButtons_');
const AppTocContent = require('./Content/AppTocContent_');
const AppTocSlider = require('./Slider/AppTocSlider_');
const AppTocSearch = require('./Search/AppTocSearch_');

class AppToc {
	static tocCheckedItemHandler() {
		_app_toc.addEventListener('itemClicked', e => {
			_tocSelectedItems.textContent = _app_toc.querySelectorAll('.checked').length;
		});
	}

	static addTOCCheckOnPageLoad() {
		const _checkmarks = document.querySelectorAll('.checkmark ');
		const app_toc__clickedItems = SETTINGS['app_toc__clickedItems'].sort();
		app_toc__clickedItems.forEach(clickedItem => {
			const _checkmark = _checkmarks[clickedItem - 1];
			_checkmark.classList.add('checked');
			_checkmark.firstElementChild.style.display = 'initial';
		});
	}

	static register() {
		AppTocButtons.register();
		AppTocContent.register();
		AppTocSlider.register();
		AppTocSearch.register();
	}
}

module.exports = AppToc;
