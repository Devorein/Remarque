class AppContentImage {
	parse(image) {
		const image_encoded = getImageData(image.src);
		image.setAttribute('src', 'data:image/png;base64, ' + image_encoded);
	}
}

module.exports = AppContentImage;
