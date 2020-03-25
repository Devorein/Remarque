let dragged;

function tocDragHandler() {
	document.addEventListener(
		'dragover',
		function(event) {
			// prevent default to allow drop
			event.preventDefault();
		},
		false
	);

	document.addEventListener(
		'dragenter',
		function(event) {
			if (event.target.className == 'dropzone' && !dragged.classList.contains(event.target.id)) {
				event.target.style.background = 'purple';
				event.target.style.opacity = '0.5';
			}
		},
		false
	);

	document.addEventListener(
		'dragleave',
		function(event) {
			if (event.target.className == 'dropzone') {
				event.target.style.background = '';
			}
		},
		false
	);

	document.addEventListener(
		'drop',
		function(event) {
			event.preventDefault();
			if (event.target.className == 'dropzone') {
				event.target.style.background = '';
				event.target.style.opacity = '1';
				dragged.parentNode.removeChild(dragged);
				event.target.appendChild(dragged);
				window.localStorage.setItem('tocPosition', _toc.parentElement.id.split('-')[1]);
				repositionSlider(event.target.id);
			}
		},
		false
	);
}

function repositionSlider(id) {
	_toc.classList.add(id);
	if (id === 'dropzone-left') {
		_toc.classList.remove('dropzone-right');
		_toc.style.left = '0px';
		_content.style.left = `${parseInt(_toc.style.width)}px`;
	}
	else if (id === 'dropzone-right') {
		_toc.classList.remove('dropzone-left');
		_content.style.left = '0px';
		_toc.style.width = `${window.innerWidth - parseInt(_content.style.width) + 25}px)`;
	}
}

function dragSlider() {
	_slider.addEventListener('drag', (e) => {
		resizeContent(e.clientX);
	});

	document.addEventListener(
		'dragstart',
		function(event) {
			dragged = event.target.parentElement;
		},
		false
	);

	_slider.addEventListener('dragend', (e) => {
		resizeContent(e.clientX);
		const tocPosition = _toc.classList[1].split('-')[1];
		if (tocPosition === 'left') _rightDropZone.style.width = '0px';
		else if (tocPosition === 'right') _leftDropZone.style.width = '0px';
	});
}

// : Check for refactoring
function resizeContent(lastWidth) {
	if (lastWidth < 500 && _toc.classList.contains('dropzone-left')) {
		_toc.style.width = `${lastWidth}px`;
		_toc.style.left = '0px';
		_content.style.width = `calc(100% - ${parseInt(_toc.style.width)}px)`;
		_content.style.left = `${parseInt(_toc.style.width)}px`;
		_leftDropZone.style.width = `${lastWidth}px`;
		_rightDropZone.style.width = `${lastWidth}px`;
	}
	else if (lastWidth > window.innerWidth - 500 && _toc.classList.contains('dropzone-right')) {
		_toc.style.width = `${parseInt(window.innerWidth - lastWidth)}px`;
		_toc.style.left = `calc(100% - ${parseInt(_toc.style.width)}px)`;
		_content.style.width = `calc(100% - ${parseInt(_toc.style.width) + 25}px)`;
		_content.style.left = `0px`;
		const calculatedWidth = Math.abs(parseInt(window.innerWidth - lastWidth));
		_leftDropZone.style.width = `${calculatedWidth}px`;
		_rightDropZone.style.width = `${calculatedWidth}px`;
	}
	if (parseInt(window.getComputedStyle(_toc).width.replace('px')) < 400) {
		if (!_toc.classList.contains('limit')) _toc.classList.add('limit');
	}
	else _toc.classList.remove('limit');
	window.localStorage.setItem('tocSize', _toc.style.width.replace('px', ''));
}

module.exports = {
	tocDragHandler,
	dragSlider,
	repositionSlider
};
