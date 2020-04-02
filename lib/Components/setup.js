const { themeToggler } = require('./handlers');
const { toggleTOCElem } = require('./toc');

function activatePreviousButtons() {
	// [ 'codeDisplay', 'tocCodeSearch', 'tocToggleCustom', 'searchIgnoreCap', 'tocToggleIcon' ].forEach(button => {
	// 	const state = window.localStorage.getItem(button);
	// 	const _target = document.getElementById(button);
	// 	if (state.toString() === 'true') _target.classList.add('activated');
	// 	else _target.classList.remove('activated');
	// });
}

function getallTOCElems() {
	const temp = {};
	Array.from(document.querySelectorAll('.toc--L1-item-container .toc-item')).forEach(tocElem => {
		const _target = tocElem.children[tocElem.children.length - 1];
		temp[_target.getAttribute('href')] = _target.textContent;
	});
	return temp;
}

function initialSetup() {
	window._toc = document.getElementById('TOC');
	window._content = document.getElementById('content');
	window._overlay = document.getElementById('overlay');
	window._slider = document.getElementById('slider');
	window._tocInputField = document.getElementById('tocInputField');
	window._tocHiddenItems = document.getElementById('tocHiddenItems');
	window._tocTotalItems = document.getElementById('tocTotalItems');
	window._leftDropZone = document.getElementById('dropzone-left');
	window._rightDropZone = document.getElementById('dropzone-right');
	window._tocCodeSearchIcon = document.getElementById('tocCodeSearch');
	window._tocToggleCustomIcon = document.getElementById('tocToggleCustom');
	window._toc = document.getElementById('TOC');
	window._slider = document.getElementById('slider');
	window._themeIconContainer = document.getElementById('theme-icon-container');
	window._clock = document.getElementById('clock');
	window._clockIcon = document.getElementById('clockIcon');
	window._progress = document.getElementById('progress');
	window._progressIcon = document.getElementById('progressIcon');
	window._body = document.querySelector('body#preview');
	window._bottom = document.querySelector('#bottom');
	window._top = document.querySelector('#top');
	window._collapseTOCIcon = document.getElementById('collapseTOC');
	window._expandTOCIcon = document.getElementById('expandTOC');
	window._tocToggleIcon = document.getElementById('tocToggleIcon');
	window._pageExtremeTopIcon = document.getElementById('pageExtremeTopIcon');
	window._pageExtremeBottomIcon = document.getElementById('pageExtremeBottomIcon');
	window._toc_items = Array.from(document.querySelectorAll('.toc-item'));

	window.total_seconds = 0;

	window.allTOCElems = getallTOCElems();
}

function usePreviousSetup() {
	let theme = window.localStorage.getItem('theme');
	let lastLink = window.localStorage.getItem('lastLink');
	let lastFilePath = window.localStorage.getItem('lastFile');
	let tocSearchValue = window.localStorage.getItem('tocSearchValue');
	let tocPosition = window.localStorage.getItem('tocPosition');
	let tocSize = window.localStorage.getItem('tocSize');
	let currentFilePath = window.location.pathname;

	tocPosition = tocPosition ? tocPosition : 'left';
	theme = theme ? theme : 'dark';
	tocSearchValue = tocSearchValue ? tocSearchValue : '';

	if (theme === 'dark') themeToggler('dark');
	else if (theme === 'light') themeToggler('light');

	const isSameFile = currentFilePath === lastFilePath;
	if (!isSameFile) {
		window.localStorage.removeItem('lastLink');
		window.localStorage.setItem('lastFile', currentFilePath);
	}
	else {
		activatePreviousButtons();
		_tocInputField.value = tocSearchValue;

		toggleTOCElem();

		document.getElementById(`dropzone-${tocPosition}`).appendChild(_toc);

		if (tocPosition === 'left') {
			_leftDropZone.style.width = `${tocSize}px`;
			_rightDropZone.style.width = `0px`;
			_content.style.left = `${parseInt(_toc.parentElement.style.width) + 30}px`;
			_content.style.width = `calc(100% - ${parseInt(_toc.parentElement.style.width) + 30}px)`;
		}
		else if (tocPosition === 'right') {
			_rightDropZone.style.width = `${tocSize}px`;
			_leftDropZone.style.width = `0px`;
			_content.style.left = '0px';
			_content.style.width = `calc(100% - ${parseInt(_toc.parentElement.style.width) + 30}px)`;
		}

		if (lastLink && document.getElementById(lastLink.substring(1))) {
			document.querySelector(`span[href="${lastLink.substring(1)}"]`).parentElement.scrollIntoView({
				behavior : 'smooth'
			});
			document.getElementById(lastLink.substring(1)).scrollIntoView({
				behavior : 'smooth'
			});
		}
	}
}

module.exports = {
	initialSetup,
	usePreviousSetup
};
