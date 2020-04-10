const AppContentButtonDownload = require('./AppContentButtionDownload_');
const AppContentButtonTop = require('./AppContentButtonTop_');
const AppContentButtonBottom = require('./AppContentButtonBottom_');

class AppContentButtons {
	static contentScrolled() {
		_app_content_buttons.addEventListener('contentScrolled', () => {
			_app_content_buttons.style.top = `${_app_content.scrollTop}px`;
		});
	}
	static register() {
		AppContentButtonDownload.register();
		AppContentButtonTop.register();
		AppContentButtonBottom.register();
		this.contentScrolled();
	}
}

module.exports = AppContentButtons;
