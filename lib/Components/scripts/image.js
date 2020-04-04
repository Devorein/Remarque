// ? Clicking on an image enlargens it
function imageClickHandler() {
	Array.from(document.querySelectorAll('img')).forEach(_image => {
		_image.addEventListener('click', e => {
			_overlay.style.display = 'block';
			const clonedImage = _image.cloneNode(true);
			clonedImage.classList.add('swoosh');
			_overlay.appendChild(clonedImage);
		});
	});
}

module.exports = {
	imageClickHandler
};
