class AppTocButtonTransfer {
	static clickH() {
		const app_toc__position = SETTINGS['app_toc__position'];
		if (app_toc__position === 'right') {
			if (_app_dropzone_right._app_dropzone_left)
				_app_dropzone_right.appendChild(_app_dropzone_left.removeChild(_app_toc));
			else _app_dropzone_right.appendChild(_app_toc);
			_app_dropzone_left.style.width = '0px';
		}
		else if (app_toc__position === 'left') {
			if (_app_dropzone_right.firstElementChild)
				_app_dropzone_left.appendChild(_app_dropzone_right.removeChild(_app_toc));
			else _app_dropzone_left.appendChild(_app_toc);
			_app_dropzone_right.style.width = '0px';
		}
		_app.dispatchEvent(new CustomEvent('tocSizeChanged'));
	}

	static click() {
		_app_toc_button_transfer.addEventListener('click', e => {
			const app_toc__position = SETTINGS['app_toc__position'];
			SETTINGS['app_toc__position'] = app_toc__position === 'left' ? 'right' : 'left';
			AppTocButtonTransfer.clickH();
		});
	}
	static register() {
		AppTocButtonTransfer.click();
	}
}

module.exports = AppTocButtonTransfer;
