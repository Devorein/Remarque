class AppContentCodeCodeBlockDownload {
	static click() {
		Array.from(document.querySelectorAll('.icon--download')).forEach(_download_icon => {
			_download_icon.addEventListener('click', () => {
				const code = _download_icon.parentElement.querySelector('code');
				download(`${code.getAttribute('file-name')}`, code.textContent);
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = AppContentCodeCodeBlockDownload;
