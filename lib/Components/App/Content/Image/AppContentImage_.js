class AppContentImage {
	static click() {
		Array.from(document.querySelectorAll('img')).forEach(_image => {
			_image.addEventListener('click', e => {
				_overlay.style.display = 'block';
				const clonedImage = _image.cloneNode(true);
				clonedImage.classList.add('swoosh');
				_overlay.appendChild(clonedImage);
			});
		});
	}

	static register() {
		AppContentImage.click();
	}
}

module.exports = AppContentImage;
