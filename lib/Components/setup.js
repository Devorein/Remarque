const {
	makeConstantProp,
	createElementFromHTML,
	removeClass,
	simulateClick,
	scrollHighlightLine,
	download,
	copyToClipboard,
	displayTime
} = require('./Utils/utility');

const AppContent = require('./App/Content/AppContent_');
const App = require('./App/App_');
const ButtonTheme = require('./Buttons/ButtonTheme_');
const AppTocContent = require('./App/Toc/Content/AppTocContent_');
const AppTocButtonToggle = require('./App/Toc/Button/AppTocButtonToggle_');
const AppTocButtonTransfer = require('./App/Toc/Button/AppTocButtonTransfer_');
const AppButtonClock = require('./App/Buttons/AppButtonClock_');
const AppButtonProgress = require('./App/Buttons/AppButtonProgress_');
const AppTocContentItemContent = require('./App/Toc/Content/Item/AppTocContentItemContent_');
const AppContentCodeFSBlockItem = require('./App/Content/Code/FS/AppContentCodeFSBlockItem_');
const AppTocSearchStatus = require('./App/Toc/Search/AppTocSearchStatus_');
const AppClockPlaypause = require('./App/Clock/AppClockPlaypause_');
const AppClockTransfer = require('./App/Clock/AppClockTransfer_');
const AppButtonZen = require('./App/Buttons/AppButtonZen_');
const AppTocContentItemCheck = require('./App/Toc/Content/Item/AppTocContentItemCheck_');
const Buttons = require('./Buttons/Buttons_');

const DEFAULT_VALS = {
	__theme                          : 'dark',
	__totalSeconds                   : 0,
	__lastFile                       : '',
	__lastLink                       : '',
	__currentPage                    : 'app',
	app_toc__clickedItems            : [],
	app_toc__size                    : 450,
	app_toc__position                : 'left',
	app_toc_button_toggle            : false,
	app_toc_search_input__value      : '',
	app_toc_search_button_code       : false,
	app_toc_search_button_ignorecase : false,
	app_toc_search_button_regex      : false,
	app_toc_search_button_custom     : false,
	app_button_clock                 : false,
	app_button_progress              : false,
	app_button_zen                   : false,
	app_clock__state                 : false,
	app_clock__position              : 'left'
};

function activatePreviousButtons() {
	[
		'app_button_clock',
		'app_button_progress',
		'app_button_zen',
		'app_toc_button_toggle',
		'app_toc_search_button_code',
		'app_toc_search_button_custom',
		'app_toc_search_button_ignorecase',
		'app_toc_search_button_regex'
	].forEach(button => {
		const state = SETTINGS[button];
		const _target = window[`_${button}`];
		if (state === true) _target.classList.add('activated');
		else _target.classList.remove('activated');
	});
}

function initializeSettings() {
	window.SETTINGS = {};
	Object.entries(DEFAULT_VALS).forEach(([ key, def_val ]) => {
		let ls_value = window.localStorage.getItem(key);
		if (ls_value) {
			if (ls_value === 'true') ls_value = true;
			else if (ls_value === 'false') ls_value = false;
			else if (ls_value.includes('[')) ls_value = JSON.parse(ls_value);
			else if (ls_value.match(/^[0-9]+$/g)) ls_value = parseInt(ls_value);
		}
		SETTINGS[key] = ls_value ? ls_value : def_val;
	});
}

function getallTOCElems() {
	const temp = {};
	Array.from(document.querySelectorAll('.toc--L1-item-container .app_toc_item')).forEach(tocElem => {
		const _target = tocElem.children[tocElem.children.length - 1];
		temp[_target.getAttribute('href')] = _target.textContent;
	});
	return temp;
}

function initializeGlobalElements() {
	const GLOBAL_ELEMS = [
		'body',
		'buttons',
		'button_groups',
		'button_app',
		'button_settings',
		'button_theme',
		'button_theme_dark',
		'button_theme_light',
		'groups',
		'groups_overlay',
		'groups_overlay_content',
		'groups_overlay_counter',
		'groups_overlay_buttons',
		'groups_overlay_button_prev',
		'groups_overlay_button_next',
		'groups_overlay_button_nextuniq',
		'groups_overlay_button_prevuniq',
		'groups_overlay_button_close',
		'groups_content',
		'groups_buttons',
		'settings',
		'app',
		'app_clock',
		'app_clock_playpause',
		'app_clock_restart',
		'app_clock_transfer',
		'app_clock_timer',
		'app_progress',
		'app_progress_bar',
		'app_progress_counter',
		'app_content',
		'app_content_top',
		'app_content_bottom',
		'app_content_buttons',
		'app_content_button_download',
		'app_content_button_top',
		'app_content_button_bottom',
		'app_buttons',
		'app_button_zen',
		'app_button_clock',
		'app_button_progress',
		'app_toc',
		'app_toc_content',
		'app_toc_slider',
		'app_toc_search_input',
		'app_toc_search_status',
		'app_toc_search_status_selected',
		'app_toc_search_status_hidden',
		'app_toc_search_status_total',
		'app_toc_search_button_code',
		'app_toc_search_button_custom',
		'app_toc_search_button_regex',
		'app_toc_search_button_ignorecase',
		'app_toc_button_expand',
		'app_toc_button_collapse',
		'app_toc_button_toggle',
		'app_toc_button_transfer',
		'app_toc_button_drag',
		'app_dropzone_right',
		'app_dropzone_left'
	];

	makeConstantProp(`_app_toc_content_items`, Array.from(document.querySelectorAll('.app_toc_content_item')));
	makeConstantProp(`_app_toc_contents`, Array.from(document.querySelectorAll('.toc--content')));
	makeConstantProp(
		`_groups_content_item_content_items`,
		Array.from(document.querySelectorAll('.groups_content_item_content_item'))
	);
	makeConstantProp(`_app_toc_content_item_checkmarks`, Array.from(document.querySelectorAll('.checkmark')));

	[
		createElementFromHTML,
		removeClass,
		simulateClick,
		scrollHighlightLine,
		download,
		copyToClipboard,
		displayTime
	].forEach(func => {
		makeConstantProp(`${func.name}`, func);
	});

	GLOBAL_ELEMS.forEach(GLOBAL_ELEM => {
		makeConstantProp(`_${GLOBAL_ELEM}`, document.getElementById(GLOBAL_ELEM));
	});
}

function initialSetup() {
	// 🤔 Wondering what to do about this
	// window.allTOCElems = getallTOCElems();
	initializeGlobalElements();
	initializeSettings();
	usePreviousSetup();
	Array.from(document.querySelectorAll('.code-container')).forEach(_codeContainer => {
		const firstFile = _codeContainer.querySelector('.file-dir .file-item-children .file-name');
		AppContentCodeFSBlockItem.clickH(firstFile);
	});

	document.onfullscreenchange = function(event) {
		AppButtonZen._checkForZenMode();
	};

	saveToLsBeforeUnload();
}

function saveToLsBeforeUnload() {
	window.addEventListener('beforeunload', function(e) {
		window.localStorage.setItem(
			'__totalSeconds',
			SETTINGS['__totalSeconds'] !== 0 ? --SETTINGS['__totalSeconds'] : 0
		);
		Object.keys(DEFAULT_VALS).forEach(key => {
			if (Array.isArray(SETTINGS[key])) window.localStorage.setItem(key, JSON.stringify(SETTINGS[key]));
			else window.localStorage.setItem(key, SETTINGS[key]);
		});
	});
}

function usePreviousSetup() {
	const __lastFile = window.localStorage.getItem('__lastFile');
	if (__lastFile === window.location.pathname) {
		SETTINGS['__totalSeconds'] = parseInt(window.localStorage.getItem('__totalSeconds'));
		_app_toc_search_input.value = window.localStorage.getItem('app_toc_search_input__value');
	}
	else {
		SETTINGS['__totalSeconds'] = 0;
		window.localStorage.setItem('__lastFile', window.location.pathname);
	}
	activatePreviousButtons();
	Buttons.togglePageH();
	ButtonTheme.clickH();
	AppButtonClock.clickH();
	AppButtonProgress.clickH();
	AppTocButtonToggle.clickH();
	AppTocContentItemContent.clickH();
	AppTocButtonTransfer.clickH();
	AppTocSearchStatus.tocItemChangedH();
	AppTocContent.tocItemsChangedH();
	App.tocSizeChangedH();
	AppClockPlaypause.clickH();
	AppClockTransfer.clickH();
	AppButtonZen.clickH();
	AppTocContentItemCheck._checkOnLoad();
}

module.exports = initialSetup;
