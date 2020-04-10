class AppContentButtonTop {
	static click() {
		_app_content_button_top.addEventListener('click', e => {
			window.selected_index = 0;
			document.getElementById('app_content_top').scrollIntoView({
				behavior : 'smooth'
			});
		});
	}
	static register() {
		AppContentButtonTop.click();
	}
}

module.exports = AppContentButtonTop;
