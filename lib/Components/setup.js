const { themeToggler, searchButtonHandler } = require('./handlers');
const { toggleTOCElem } = require('./toc');
const { repositionSlider } = require('./slider');

function getHeaderPosition() {
	const temp = {};
	Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach(header => {
		const top = header.offsetTop;
		const level = header.tagName.substring(1);
		temp[header.id] = [ top, level ];
	});
	return temp;
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
	window.SETTINGS = {};

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
	window.allHeadingPos = getHeaderPosition();
}

function usePreviousSetup() {
	window.SETTINGS.theme = window.localStorage.getItem('theme');
	window.SETTINGS.lastLink = window.localStorage.getItem('last-link');
	window.SETTINGS.lastFilePath = window.localStorage.getItem('last-file');
	window.SETTINGS.tocSearchValue = window.localStorage.getItem('tocSearchValue');
	window.SETTINGS.codeDisplay = window.localStorage.getItem('codeDisplay');
	window.SETTINGS.tocCodeSearch = window.localStorage.getItem('tocCodeSearch');
	window.SETTINGS.tocToggleCustom = window.localStorage.getItem('tocToggleCustom');
	window.SETTINGS.tocPosition = window.localStorage.getItem('tocPosition');
	window.SETTINGS.tocSize = window.localStorage.getItem('tocSize');

	const currentFilePath = window.location.pathname;

	const {
		theme,
		lastLink,
		lastFilePath,
		tocSearchValue,
		codeDisplay,
		tocCodeSearch,
		tocToggleCustom,
		tocPosition,
		tocSize
	} = window.SETTINGS;

	if (theme === 'dark') themeToggler('dark');
	else if (theme === 'light') themeToggler('light');
	const isSameFile = currentFilePath === lastFilePath;
	if (!isSameFile) {
		window.localStorage.removeItem('last-link');
		window.localStorage.setItem('last-file', currentFilePath);
	}
	else {
		Array.from(document.querySelectorAll('.code-block')).forEach(codeBlock => {
			codeBlock.style.flexDirection = codeDisplay === 'C' ? 'row' : 'column';
		});
		toggleTOCElem(tocSearchValue);
		_tocInputField.value = tocSearchValue;
		if (tocCodeSearch === 'true') _tocCodeSearchIcon.classList.add('activated');
		searchButtonHandler('tocCodeSearch', tocCodeSearch);
		if (tocToggleCustom === 'true') _tocToggleCustomIcon.classList.add('activated');
		searchButtonHandler('tocToggleCustom', tocToggleCustom);
		_toc.style.width = `${tocSize}px`;
		if (tocPosition === 'left') _leftDropZone.style.width = `${tocSize}px`;
		else if (tocPosition === 'right') _rightDropZone.style.width = `${tocSize}px`;
		_content.style.width = `calc(100% - ${parseInt(tocSize) + 25}px)`;
		document.getElementById(`dropzone-${tocPosition}`).appendChild(_toc);
		repositionSlider(`dropzone-${tocPosition}`);

		if (lastLink && document.getElementById(lastLink.substring(1))) {
			const lastLinkContainer = document.getElementById(lastLink.substring(1) + '_container');
			if (lastLinkContainer)
				lastLinkContainer.scrollIntoView({
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
