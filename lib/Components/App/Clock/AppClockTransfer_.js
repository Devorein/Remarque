class AppClockTransfer {
	static clickH() {
		const { app_clock__position, app_toc__size, app_toc__position } = SETTINGS;
		if (app_toc__position === 'left' && app_clock__position === 'left')
			_app_clock.style.left = `${parseInt(app_toc__size) + 40}px`;
		else if (app_toc__position === 'left' && app_clock__position === 'right')
			_app_clock.style.left = `calc(100% - 80px)`;
		else if (app_toc__position === 'right' && app_clock__position === 'left') _app_clock.style.left = `10px`;
		else if (app_toc__position === 'right' && app_clock__position === 'right')
			_app_clock.style.left = `calc(100% - ${parseInt(app_toc__size) + 110}px)`;
	}

	static click() {
		_app_clock_transfer.addEventListener('click', e => {
			SETTINGS['app_clock__position'] = SETTINGS['app_clock__position'] === 'left' ? 'right' : 'left';
			_app_clock.style.transition = 'left 250ms ease-in-out';
			setTimeout(() => {
				_app_clock.style.transition = 'transform 250ms ease-in-out';
			}, 500);
			this.clickH();
		});
	}
	static register() {
		AppClockTransfer.click();
	}
}

module.exports = AppClockTransfer;
