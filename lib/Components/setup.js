const { themeToggler } = require('./handlers');
const { toggleTOCElem } = require('./toc');

function activatePreviousButtons() {
	[
		'codeDisplay',
		'tocCodeSearch',
		'tocToggleCustom',
		'searchIgnoreCap',
		'tocToggle',
		'progress',
		'clock'
	].forEach(button => {
		const state = window.localStorage.getItem(button);
		const _target = document.getElementById(`${button}Icon`);
		if (state.toString() === 'true') _target.classList.add('activated');
		else _target.classList.remove('activated');
	});
}

function initializeSettings() {
	const DEFAULT_VALS = {
		tocPosition     : 'left',
		theme           : 'dark',
		tocSearchValue  : '',
		tocSize         : 450,
		codeDisplay     : 'false',
		tocCodeSearch   : 'false',
		tocToggleCustom : 'false',
		searchIgnoreCap : 'false',
		tocToggle       : 'false',
		lastFile        : '',
		lastLink        : '',
		progress        : 'false',
		clock           : 'false'
	};
	Object.entries(DEFAULT_VALS).forEach(([ key, def_val ]) => {
		let ls_value = window.localStorage.getItem(key);
		ls_value = ls_value ? ls_value : def_val;
		window.localStorage.setItem(key, ls_value);
	});
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
	window._tocCodeSearchIcon = document.getElementById('tocCodeSearchIcon');
	window._tocToggleCustomIcon = document.getElementById('tocToggleCustomIcon');
	window._toc = document.getElementById('TOC');
	window._slider = document.getElementById('slider');
	window._themeIconContainer = document.getElementById('theme-icon-container');
	window._clock = document.getElementById('clock');
	window._progress = document.getElementById('progress');
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
	initializeSettings();
	usePreviousSetup();
}

function toggleClockProgress() {
	[ 'progress', 'clock' ].forEach(icon => {
		const _icon = document.getElementById(`${icon}Icon`);
		const _target = document.getElementById(`${icon}`);
		_target.style.opacity = _icon.classList.contains('activated') ? '1' : '0';
	});
}

function scrollToPreviousLink() {
	const lastLink = window.localStorage.getItem('lastLink');
	if (lastLink && document.getElementById(lastLink)) {
		document.querySelector(`span[href="${lastLink}"]`).parentElement.scrollIntoView({
			behavior : 'smooth'
		});
		document.getElementById(lastLink).scrollIntoView({
			behavior : 'smooth'
		});
	}
}

function repositionTOC() {
	const tocPosition = window.localStorage.getItem('tocPosition');
	const tocSize = window.localStorage.getItem('tocSize');
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
}

function usePreviousTheme() {
	const theme = window.localStorage.getItem('theme');
	_body.classList.add(theme);
	themeToggler(theme);
}

function usePreviousSetup() {
	window.localStorage.setItem('lastFile', window.location.pathname);
	_tocInputField.value = window.localStorage.getItem('tocSearchValue');
	activatePreviousButtons();
	toggleTOCElem();
	repositionTOC();
	scrollToPreviousLink();
	toggleClockProgress();
	usePreviousTheme();
}

module.exports = {
	initialSetup
};
