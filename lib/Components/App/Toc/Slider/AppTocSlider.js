class AppTocSlider {
	create() {
		makeConstantProp(
			'_app_toc_slider',
			htmlElementCreation({
				classes    : 'slider',
				id         : 'app_toc_slider',
				attributes : { draggable: true },
				parentElem : _app_toc
			})
		);
	}
}

module.exports = AppTocSlider;
