const { calculateTOC_Content } = require('./utility');

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
				calculateTOC_Content();
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

function resizeContent(lastWidth) {
	if (lastWidth > 250 && lastWidth < 500 && _toc.parentElement.id.includes('left')) {
		window.localStorage.setItem('tocSize', lastWidth);
		calculateTOC_Content(true);
	}
	else if (
		lastWidth < window.innerWidth - 250 &&
		lastWidth > window.innerWidth - 500 &&
		_toc.parentElement.id.includes('right')
	) {
		const calculatedWidth = Math.abs(parseInt(window.innerWidth - lastWidth));
		window.localStorage.setItem('tocSize', calculatedWidth);
		calculateTOC_Content(true);
	}
}

module.exports = {
	tocDragHandler,
	dragSlider
};
