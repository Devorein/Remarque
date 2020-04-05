const { calculateTOC_Content } = require('./utility');

const { clockPositionHandler } = require('./clock');

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
				event.target.style.zIndex = '10';
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
				event.target.style.zIndex = '1';
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
				clockPositionHandler();
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

	_dragIcon.addEventListener('drag', e => {});

	_dragIcon.addEventListener('dragend', e => {});

	_dragIcon.addEventListener(
		'dragstart',
		function(event) {
			const tocSize = window.localStorage.getItem('tocSize');
			_leftDropZone.style.width = `${tocSize}px`;
			_rightDropZone.style.width = `${tocSize}px`;
			dragged = event.target.parentElement.parentElement;
		},
		false
	);

	_dragIcon.addEventListener('dragend', e => {
		const tocPosition = window.localStorage.getItem('tocPosition');
		document.getElementById(`dropzone-${tocPosition === 'left' ? 'right' : 'left'}`).style.width = '0px';
	});

	_slider.addEventListener('dragend', e => {
		const tocToggle = window.localStorage.getItem('tocToggle');
		if (tocToggle.toString() !== 'true') resizeContent(e.clientX);
	});
}

function resizeContent(lastWidth) {
	if (lastWidth > 250 && lastWidth < 500 && _toc.parentElement.id.includes('left')) {
		window.localStorage.setItem('tocSize', lastWidth);
		calculateTOC_Content();
	}
	else if (
		lastWidth < window.innerWidth - 250 &&
		lastWidth > window.innerWidth - 500 &&
		_toc.parentElement.id.includes('right')
	) {
		const calculatedWidth = Math.abs(parseInt(window.innerWidth - lastWidth));
		window.localStorage.setItem('tocSize', calculatedWidth);
		calculateTOC_Content();
	}
	clockPositionHandler();
}

module.exports = {
	tocDragHandler,
	dragSlider
};
