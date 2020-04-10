class AppDropzone {
	create() {
		[ 'right', 'left' ].forEach(dropzone => {
			htmlElementCreation({
				classes    : 'dropzone',
				id         : `app_dropzone_${dropzone}`,
				parentElem : _app
			});
		});
	}
}

module.exports = AppDropzone;
