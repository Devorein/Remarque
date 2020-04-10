const AppContentButtons = require('./Button/AppContentButtons_');
const AppContentImage = require('./Image/AppContentImage_');
const AppContentCode = require('./Code/AppContentCode_');

class AppContent {
	static _calculatePageProgress() {
		const percent =
			_app_content.scrollTop / (_app_content.scrollHeight - document.documentElement.clientHeight) * 100;
		let res = percent.toFixed(2);
		res = res < 100 ? res : 100;
		_app_progress_counter.textContent = `${res}%`;
		_app_progress_bar.style.width = `${res}%`;
		const green = res / 100 * 255;
		const red = 255 - green;
		_app_progress_bar.style.backgroundColor = `rgba(${red},${green},0,.75)`;
	}

	static scrollH() {
		this._calculatePageProgress();
	}

	static scroll() {
		_app_content.addEventListener('scroll', e => {
			this.scrollH();
			_app_content_buttons.dispatchEvent(new CustomEvent('contentScrolled'));
		});
	}

	static register() {
		[ AppContentCode, AppContentImage, AppContentButtons ].forEach(C => C.register());
		this.scroll();
	}
}

module.exports = AppContent;
