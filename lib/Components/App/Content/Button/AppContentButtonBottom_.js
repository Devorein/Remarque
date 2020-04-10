class AppContentButtonBottom {
	static click() {
		_app_content_button_bottom.addEventListener('click', e => {
			selected_index = _app_toc_content_items.length - 1;
			document.getElementById('app_content_bottom').scrollIntoView({
				behavior : 'smooth'
			});
		});
	}
	static register() {
		AppContentButtonBottom.click();
	}
}

module.exports = AppContentButtonBottom;
