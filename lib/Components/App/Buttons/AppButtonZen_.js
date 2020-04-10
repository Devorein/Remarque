class AppButtonZen {
	static _checkForZenMode() {
		const tocToggle = SETTINGS['app_toc_button_toggle'];
		const clock = SETTINGS['app_button_clock'];
		const progress = SETTINGS['app_button_progress'];
		const zenMode = SETTINGS['app_button_zen'];
		if (zenMode) {
			if (!tocToggle || clock || progress || !document.fullscreenElement) {
				_app_button_zen.classList.remove('activated');
				SETTINGS['app_button_zen'] = false;
			}
		}
		else {
			if (tocToggle && !clock && !progress && document.fullscreenElement) {
				_app_button_zen.classList.add('activated');
				SETTINGS['app_button_zen'] = true;
			}
		}
	}

	static clickH() {
		const tocToggle = SETTINGS['app_toc_button_toggle'];
		const clock = SETTINGS['app_button_clock'];
		const progress = SETTINGS['app_button_progress'];
		const zenMode = SETTINGS['app_button_zen'];
		if (zenMode) {
			if (!tocToggle) simulateClick(_app_toc_button_toggle);
			if (clock) simulateClick(_app_button_clock);
			if (progress) simulateClick(_app_button_progress);
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen().catch(err => {
					console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
				});
			}
		}
		else {
			if (tocToggle) simulateClick(_app_toc_button_toggle);
			if (!clock) simulateClick(_app_button_clock);
			if (!progress) simulateClick(_app_button_progress);
			document.exitFullscreen().catch(err => {
				console.log(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
			});
		}
	}

	static click() {
		_app_button_zen.addEventListener('click', e => {
			_app_button_zen.classList.toggle('activated');
			SETTINGS['app_button_zen'] = !SETTINGS['app_button_zen'];
			this.clickH();
		});
	}
	static zenChanged() {
		_app_button_zen.addEventListener('zenChanged', e => {
			this._checkForZenMode();
		});
	}

	static register() {
		this.click();
		this.zenChanged();
	}
}

module.exports = AppButtonZen;
