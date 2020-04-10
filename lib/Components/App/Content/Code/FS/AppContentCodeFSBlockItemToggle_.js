class AppContentCodeFSBlockItemToggle {
	static click() {
		Array.from(document.querySelectorAll('.file-item--toggle')).forEach(_file_toggle => {
			_file_toggle.addEventListener('click', e => {
				_file_toggle.parentElement.nextElementSibling.classList.toggle('hidden');
				const hidden = _file_toggle.parentElement.nextElementSibling.classList.contains('hidden');
				if (hidden) _file_toggle.firstElementChild.style.transform = 'rotateZ(-90deg)';
				else if (!hidden) _file_toggle.firstElementChild.style.transform = 'rotateZ(-180deg)';
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = AppContentCodeFSBlockItemToggle;
