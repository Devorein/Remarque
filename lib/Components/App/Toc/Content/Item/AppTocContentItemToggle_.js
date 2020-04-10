class AppTocContentItemToggle {
	static click() {
		Array.from(document.querySelectorAll('.icon--toggle')).forEach(_icon => {
			_icon.addEventListener('click', e => {
				_icon.classList.toggle('link--hidden');
				_icon.parentElement.nextElementSibling.classList.toggle('hidden');
			});
		});
	}

	static register() {
		AppTocContentItemToggle.click();
	}
}

module.exports = AppTocContentItemToggle;
