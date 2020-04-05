const { themeToggler } = require('./button');
const { toggleTOCElem } = require('./toc');
const { makeConstantProp, calculateTOC_Content } = require('./utility');
const { play_pause_clockHandler } = require('./clock');

function activatePreviousButtons() {
	[
		'codeDisplay',
		'tocCodeSearch',
		'tocToggleCustom',
		'searchIgnoreCap',
		'tocToggle',
		'progress',
		'clock',
		'searchUseRegex'
	].forEach(button => {
		const state = window.localStorage.getItem(button);
		const _target = document.getElementById(`${button}Icon`);
		if (state && state.toString() === 'true') _target.classList.add('activated');
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
		clock           : 'false',
		zenModeToggle   : 'false',
		totalSeconds    : 0,
		clockState      : 'play'
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
	const GLOBAL_ELEMS = {
		_toc                   : document.getElementById('TOC'),
		_content               : document.getElementById('content'),
		_overlay               : document.getElementById('overlay'),
		_slider                : document.getElementById('slider'),
		_tocInputField         : document.getElementById('tocInputField'),
		_tocHiddenItems        : document.getElementById('tocHiddenItems'),
		_tocTotalItems         : document.getElementById('tocTotalItems'),
		_leftDropZone          : document.getElementById('dropzone-left'),
		_rightDropZone         : document.getElementById('dropzone-right'),
		_tocCodeSearchIcon     : document.getElementById('tocCodeSearchIcon'),
		_tocToggleCustomIcon   : document.getElementById('tocToggleCustomIcon'),
		_toc                   : document.getElementById('TOC'),
		_slider                : document.getElementById('slider'),
		_themeIconContainer    : document.getElementById('theme-icon-container'),
		_clockContainer        : document.getElementById('clockContainer'),
		_progressContainer     : document.getElementById('progressContainer'),
		_body                  : document.querySelector('body#preview'),
		_bottom                : document.querySelector('#bottom'),
		_top                   : document.querySelector('#top'),
		_collapseTOCIcon       : document.getElementById('collapseTOC'),
		_expandTOCIcon         : document.getElementById('expandTOC'),
		_tocToggleIcon         : document.getElementById('tocToggleIcon'),
		_zenModeToggleIcon     : document.getElementById('zenModeToggleIcon'),
		_pageExtremeTopIcon    : document.getElementById('pageExtremeTopIcon'),
		_pageExtremeBottomIcon : document.getElementById('pageExtremeBottomIcon'),
		_toc_items             : Array.from(document.querySelectorAll('.toc-item')),
		_toc_contents          : Array.from(document.querySelectorAll('.toc--content')),
		_codeDisplayIcon       : document.getElementById('codeDisplayIcon'),
		_downloadCodesIcon     : document.getElementById('downloadCodesIcon'),
		_progressIcon          : document.getElementById('progressIcon'),
		_progressCounter       : document.getElementById('progressCounter'),
		_progressBar           : document.getElementById('progressBar'),
		_clockIcon             : document.getElementById('clockIcon'),
		_transferIcon          : document.getElementById('transferIcon'),
		_clockPlayPause        : document.getElementById('clockPlayPause'),
		_clockRestart          : document.getElementById('clockRestart'),
		_searchUseRegex        : document.getElementById('searchUseRegex')
	};

	Object.entries(GLOBAL_ELEMS).forEach(([ key, val ]) => {
		makeConstantProp(key, val);
	});

	window.allTOCElems = getallTOCElems();
	initializeSettings();
	usePreviousSetup();
	play_pause_clockHandler();
	window.addEventListener('beforeunload', function(e) {
		window.localStorage.setItem('totalSeconds', --totalSeconds);
	});
	if (window.localStorage.getItem('tocToggle').toString() === 'true') _toc.classList.add('limit');
}

function toggleClockProgress() {
	if (_progressIcon.classList.contains('activated')) _progressContainer.classList.toggle('visible');
	if (_clockIcon.classList.contains('activated')) _clockContainer.classList.toggle('visible');
}

function scrollToPreviousLink() {
	const lastLink = window.localStorage.getItem('lastLink');
	if (lastLink && document.getElementById(lastLink) && document.querySelector(`span[href="${lastLink}"]`)) {
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
	document.getElementById(`dropzone-${tocPosition}`).appendChild(_toc);
	calculateTOC_Content();
}

function usePreviousTheme() {
	const theme = window.localStorage.getItem('theme');
	_body.classList.add(theme);
	themeToggler(theme);
}

function usePreviousSetup() {
	const lastFile = window.localStorage.getItem('lastFile');
	if (lastFile === window.location.pathname) {
		window.totalSeconds = window.localStorage.getItem('totalSeconds');
		_tocInputField.value = window.localStorage.getItem('tocSearchValue');
	}
	else {
		window.totalSeconds = 0;
		window.localStorage.setItem('lastFile', window.location.pathname);
	}

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
