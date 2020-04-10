class AppContentCodeFSToggle {
	static click() {
		Array.from(document.querySelectorAll('.file-toggle')).forEach(_file_toggle => {
			_file_toggle.addEventListener('click', e => {
				_file_toggle.parentElement.parentElement.classList.toggle('fs--toggle');
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = AppContentCodeFSToggle;
