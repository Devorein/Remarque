let dragged;

class AppTocButtonDrag {
	static dragover() {
		document.addEventListener(
			'dragover',
			function(event) {
				event.preventDefault();
			},
			false
		);
	}

	static dragenter() {
		document.addEventListener(
			'dragenter',
			function(event) {
				if (event.target.className == 'dropzone') {
					event.target.style.background = 'purple';
					event.target.style.opacity = '0.5';
					event.target.style.zIndex = '10';
				}
			},
			false
		);
	}

	static dragleave() {
		document.addEventListener(
			'dragleave',
			function(event) {
				if (event.target.className == 'dropzone') {
					event.target.style.background = '';
					event.target.style.opacity = '1';
					event.target.style.zIndex = '1';
				}
			},
			false
		);
	}

	static drop() {
		document.addEventListener(
			'drop',
			function(event) {
				event.preventDefault();
				if (event.target.className == 'dropzone') {
					event.target.style.background = '';
					event.target.style.opacity = 1;
					dragged.parentNode.removeChild(dragged);
					event.target.appendChild(dragged);
					const app_toc__position = _app_toc.parentElement.id.split('_')[2];
					SETTINGS['app_toc__position'] = app_toc__position;
					_app.dispatchEvent(new CustomEvent('tocSizeChanged'));
				}
			},
			false
		);
	}

	static dragstart() {
		_app_toc_button_drag.addEventListener(
			'dragstart',
			function(event) {
				const app_toc__size = SETTINGS['app_toc__size'];
				_app_dropzone_left.style.width = `${app_toc__size}px`;
				_app_dropzone_right.style.width = `${app_toc__size}px`;
				dragged = event.target.parentElement.parentElement;
			},
			false
		);
	}

	static dragend() {
		_app_toc_button_drag.addEventListener('dragend', e => {
			document.getElementById(
				`app_dropzone_${SETTINGS['app_toc__position'] === 'left' ? 'right' : 'left'}`
			).style.width =
				'0px';
		});
	}

	static register() {
		AppTocButtonDrag.dragstart();
		AppTocButtonDrag.dragend();
		AppTocButtonDrag.dragover();
		AppTocButtonDrag.dragenter();
		AppTocButtonDrag.dragleave();
		AppTocButtonDrag.drop();
	}
}

module.exports = AppTocButtonDrag;
