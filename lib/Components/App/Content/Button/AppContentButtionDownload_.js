class AppContentButtionDownload {
	static click() {
		_app_content_button_download.addEventListener('click', e => {
			Array.from(document.querySelectorAll('.code-block .icon--download')).forEach(_code => {
				simulateClick(_code);
			});
		});
	}

	static register() {
		AppContentButtionDownload.click();
	}
}

module.exports = AppContentButtionDownload;
