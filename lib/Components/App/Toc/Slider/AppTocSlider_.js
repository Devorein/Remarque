class AppTocSlider {
	static resizeContent(lastWidth) {
		if (lastWidth > 250 && lastWidth < 500 && _app_toc.parentElement.id.includes('left')) {
			SETTINGS['app_toc__size'] = lastWidth;
			_app.dispatchEvent(new CustomEvent('tocSizeChanged'));
		}
		else if (
			lastWidth < window.innerWidth - 250 &&
			lastWidth > window.innerWidth - 500 &&
			_app_toc.parentElement.id.includes('right')
		) {
			const calculatedWidth = Math.abs(parseInt(window.innerWidth - lastWidth));
			SETTINGS['app_toc__size'] = calculatedWidth;
			_app.dispatchEvent(new CustomEvent('tocSizeChanged'));
		}
	}

	static drag() {
		_app_toc_slider.addEventListener('drag', e => {
			if (!SETTINGS['app_toc_button_toggle']) this.resizeContent(e.clientX);
		});
	}

	static dragend() {
		_app_toc_slider.addEventListener('dragend', e => {
			if (!SETTINGS['app_toc_button_toggle']) this.resizeContent(e.clientX);
		});
	}

	static register() {
		AppTocSlider.drag();
		AppTocSlider.dragend();
	}
}

module.exports = AppTocSlider;
