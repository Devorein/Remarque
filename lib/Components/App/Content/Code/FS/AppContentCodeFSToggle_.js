class AppContentCodeFSToggle {
	static scrollH(_file_toggle) {
		const _fileGroup = _file_toggle.parentElement;
		_file_toggle.style.left = `calc(100% + ${parseFloat(_fileGroup.scrollLeft) - 10}px)`;
		_file_toggle.style.top = `calc(50% + ${parseFloat(_fileGroup.scrollTop)}px)`;
	}

	static clickH(_file_toggle) {
		_file_toggle.parentElement.parentElement.classList.toggle('fs--toggle');
	}

	static eventL() {
		Array.from(document.querySelectorAll('.file-toggle')).forEach(_file_toggle => {
			_file_toggle.addEventListener('click', e => {
				this.clickH(_file_toggle);
			});
			_file_toggle.addEventListener('scroll', e => {
				this.scrollH(_file_toggle);
			});
		});
	}
	static register() {
		this.eventL();
	}
}

module.exports = AppContentCodeFSToggle;
