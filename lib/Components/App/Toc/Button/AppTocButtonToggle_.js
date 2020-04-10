class AppTocButtonToggle {
	static clickH() {
		const { app_toc_button_toggle } = SETTINGS;
		if (app_toc_button_toggle) {
			_app_toc.classList.add('limit');
			SETTINGS['app_toc__size'] = 0;
		}
		else {
			_app_toc.classList.remove('limit');
			if (SETTINGS['app_toc__size'] === 0) SETTINGS['app_toc__size'] = 450;
		}
		_app_toc.parentElement.classList.add('transition');
		_app_content.classList.add('transition');
		setTimeout(() => {
			_app_toc.parentElement.classList.remove('transition');
			_app_content.classList.remove('transition');
		}, 500);
		_app.dispatchEvent(new CustomEvent('tocSizeChanged'));
	}

	static click() {
		_app_toc_button_toggle.addEventListener('click', e => {
			SETTINGS['app_toc_button_toggle'] = _app_toc_button_toggle.classList.toggle('activated');
			AppTocButtonToggle.clickH();
			_app_button_zen.dispatchEvent(new CustomEvent('zenChanged'));
		});
	}

	static register() {
		AppTocButtonToggle.click();
	}
}

module.exports = AppTocButtonToggle;
