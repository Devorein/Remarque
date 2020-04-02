let dragged;

function tocDragHandler() {
	document.addEventListener(
		'dragover',
		function(event) {
			event.preventDefault();
		},
		false
	);

	document.addEventListener(
		'dragenter',
		function(event) {
			if (event.target.className == 'dropzone') {
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
				event.target.style.opacity = '1';
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
				event.target.style.opacity = 1;
				dragged.parentNode.removeChild(dragged);
				event.target.appendChild(dragged);
				const tocPosition = _toc.parentElement.id.split('-')[1];
				window.localStorage.setItem('tocPosition', tocPosition);
				const tocSize = parseInt(_toc.parentElement.style.width.replace('px', '')) + 30;
				if (tocPosition === 'left') {
					_content.style.width = `calc(100% - ${tocSize})px`;
					_content.style.left = `${tocSize}px`;
				}
				else if (tocPosition === 'right') {
					_content.style.width = `calc(100% - ${tocSize})px`;
					_content.style.left = `0px`;
				}
			}
		},
		false
	);
}

function dragSlider() {
	_slider.addEventListener('drag', e => {
		const tocToggle = window.localStorage.getItem('tocToggle');
		if (tocToggle.toString() !== 'true') resizeContent(e.clientX);
	});

	document.addEventListener(
		'dragstart',
		function(event) {
			dragged = event.target.parentElement;
		},
		false
	);

	_slider.addEventListener('dragend', e => {
		const tocToggle = window.localStorage.getItem('tocToggle');
		if (tocToggle.toString() !== 'true') resizeContent(e.clientX);
		const toc_position = _toc.parentElement.id.split('-')[1];
		if (toc_position === 'left') _rightDropZone.style.width = '0px';
		else if (toc_position === 'right') _leftDropZone.style.width = '0px';
	});
}

// 🔨
function resizeContent(lastWidth) {
	if (lastWidth > 250 && lastWidth < 500 && _toc.parentElement.id.includes('left')) {
		_leftDropZone.style.width = `${lastWidth}px`;
		_rightDropZone.style.width = `${lastWidth}px`;
		_content.style.width = `calc(100% - ${parseInt(_toc.parentElement.style.width) + 30}px)`;
		_content.style.left = `${parseInt(_toc.parentElement.style.width) + 30}px`;
	}
	else if (
		lastWidth < window.innerWidth - 250 &&
		lastWidth > window.innerWidth - 500 &&
		_toc.parentElement.id.includes('right')
	) {
		const calculatedWidth = Math.abs(parseInt(window.innerWidth - lastWidth));
		_leftDropZone.style.width = `${calculatedWidth}px`;
		_rightDropZone.style.width = `${calculatedWidth}px`;
		_content.style.width = `calc(100% - ${parseInt(calculatedWidth) + 30}px)`;
		_content.style.left = `0px`;
	}

	if (parseInt(window.getComputedStyle(_toc).width.replace('px')) < 400) {
		if (!_toc.classList.contains('limit')) _toc.classList.add('limit');
	}
	else _toc.classList.remove('limit');
	window.localStorage.setItem('tocSize', _toc.parentElement.style.width.replace('px', ''));
}

module.exports = {
	tocDragHandler,
	dragSlider
};
