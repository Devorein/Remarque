const { simulateClick, createElementFromHTML, switchClass, calculateTOC_Content } = require('./utility');

// ✅
function downloadCodesIClickDownloadCodes() {
	_downloadCodesIcon.addEventListener('click', e => {
		Array.from(document.querySelectorAll('.code-block .icon--download')).forEach(_code => {
			simulateClick(_code);
		});
	});
}

function tocToggleHandler() {
	const _tocToggleIcon = document.getElementById('tocToggleIcon');
	_tocToggleIcon.addEventListener('click', e => {
		const activated = e.target.classList.toggle('activated');
		window.localStorage.setItem('tocToggle', activated);
		_toc.classList.toggle('limit');
		if (activated) window.localStorage.setItem('tocSize', 0);
		else window.localStorage.setItem('tocSize', 450);
		calculateTOC_Content();
	});
}

function zen_modeIClickTogglesZenMode() {
	_zenModeToggleIcon.addEventListener('click', e => {
		const activated = e.target.classList.toggle('activated');
		window.localStorage.setItem('zenModeToggle', activated);
		const tocShown = _tocToggleIcon.classList.contains('activated');
		if (activated) {
			if (!tocShown) simulateClick(_tocToggleIcon);
			document.body.requestFullscreen();
		}
		else {
			if (tocShown) simulateClick(_tocToggleIcon);
			document.exitFullscreen();
		}
	});
}

function toc_exp_colIClickExp_colTocitems() {
	[ _collapseTOCIcon, _expandTOCIcon ].forEach(_icon => {
		_icon.addEventListener('click', e => {
			Array.from(document.querySelectorAll('.icon--toggle')).forEach(_toggleIcon => {
				if (_toggleIcon.classList.contains('link--hidden') && _icon.id === 'expandTOC')
					simulateClick(_toggleIcon);
				else if (!_toggleIcon.classList.contains('link--hidden') && _icon.id === 'collapseTOC')
					simulateClick(_toggleIcon);
			});
		});
	});
}

// ? Change from dark to light theme
function themeIClickToggleTheme() {
	document.querySelector('#theme-icon-container').addEventListener('click', () => {
		const switchData = [ [ 'light', 'dark' ], [ 'dark', 'light' ] ];

		for (let i = 0; i < switchData.length; i++) {
			const [ check, switch_ ] = switchData[i];
			if (switchClass([ check, switch_ ], _body)) {
				themeToggler(switch_);
				window.localStorage.setItem('theme', switch_);
				break;
			}
		}
	});
}

// ✅ Move to top or bottom of screen
function positionIsClickScrollContent() {
	const _pageExtremeTopIcon = document.getElementById('pageExtremeTopIcon');
	const _pageExtremeBottomIcon = document.getElementById('pageExtremeBottomIcon');
	[ _pageExtremeTopIcon, _pageExtremeBottomIcon ].forEach(icon => {
		icon.addEventListener('click', e => {
			if (icon.id === _pageExtremeTopIcon.id) window.selected_index = 0;
			else selected_index = _toc_items.length - 1;
			document.getElementById(icon.id.includes('Bottom') ? 'bottom' : 'top').scrollIntoView({
				behavior : 'smooth'
			});
		});
	});
}

function clock_progressClickToggleVisibility() {
	[ 'clock', 'progress' ].forEach(icon => {
		const _icon = document.getElementById(`${icon}Icon`);
		_icon.addEventListener('click', e => {
			const _target = document.getElementById(`${icon}Container`);
			const activated = _icon.classList.toggle('activated');
			const top = parseInt(_target.style.top.replace('px', ''));
			_target.classList.toggle('visible');
			if (activated) _target.style.top = `${top + 75}px`;
			window.localStorage.setItem(icon, activated);
		});
	});
}

function themeToggler(new_theme) {
	const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 184 184"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>`;
	const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 291.18 286.8"><defs><style>.cls-1{fill:#ffe817;}.cls-2{fill:#f7bc00;}</style></defs><title>Asset 2</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M289.23,139.85l-24.6-14.3a4.05,4.05,0,0,1-1.1-6.1l18.1-21.8a4,4,0,0,0-2.4-6.6L251.33,86a4,4,0,0,1-3.1-5.4l9.6-26.7a4.09,4.09,0,0,0-4.5-5.4l-28,4.8a4.12,4.12,0,0,1-4.8-4l-.1-28.4a4.06,4.06,0,0,0-6.1-3.5l-24.7,14a4.2,4.2,0,0,1-5.9-2.1l-9.8-26.6a4,4,0,0,0-6.9-1.2l-18.4,21.6a4.08,4.08,0,0,1-6.2,0L124,1.45a4,4,0,0,0-6.9,1.2l-9.8,26.6a4.07,4.07,0,0,1-5.9,2.1l-24.6-14.1a4.09,4.09,0,0,0-6.1,3.5l-.1,28.4a4.12,4.12,0,0,1-4.8,4l-28-4.8a4.06,4.06,0,0,0-4.5,5.4l9.6,26.7a4,4,0,0,1-3.1,5.4L11.93,91a4.05,4.05,0,0,0-2.4,6.6l18.09,21.8a4,4,0,0,1-1.09,6.1L2,139.75a4,4,0,0,0,0,7l24.4,14.5a4.05,4.05,0,0,1,1.1,6.1l-18.1,21.9a4,4,0,0,0,2.4,6.6l27.9,5.1a4,4,0,0,1,3.1,5.4l-9.6,26.7a4.09,4.09,0,0,0,4.5,5.4l28-4.8a4.12,4.12,0,0,1,4.8,4l.1,28.4a4.06,4.06,0,0,0,6.1,3.5l24.7-14.1a4.2,4.2,0,0,1,5.9,2.1l9.8,26.6a4,4,0,0,0,6.9,1.2l18.4-21.6a4.08,4.08,0,0,1,6.2,0l18.4,21.6a4,4,0,0,0,6.9-1.2l9.8-26.6a4.07,4.07,0,0,1,5.9-2.1l24.7,14.1a4.09,4.09,0,0,0,6.1-3.5l.1-28.4a4.12,4.12,0,0,1,4.8-4l28,4.8a4.06,4.06,0,0,0,4.5-5.4l-9.61-26.7a4.06,4.06,0,0,1,3.11-5.4l27.89-5.1a4.05,4.05,0,0,0,2.4-6.6l-18-21.9a4,4,0,0,1,1.1-6.1l24.5-14.3A4.21,4.21,0,0,0,289.23,139.85Zm-143.7,109.5a105.9,105.9,0,1,1,105.9-105.9A105.88,105.88,0,0,1,145.53,249.35Z"/><circle class="cls-2" cx="145.53" cy="143.45" r="92"/></g></g></svg>`;

	_themeIconContainer.removeChild(_themeIconContainer.firstElementChild);
	if (new_theme === 'light') _themeIconContainer.appendChild(createElementFromHTML(lightIcon));
	else if (new_theme === 'dark') _themeIconContainer.appendChild(createElementFromHTML(darkIcon));
}

function transferIClickSwtichTocPos() {
	_transferIcon.addEventListener('click', e => {
		const tocPosition = window.localStorage.getItem('tocPosition');
		if (tocPosition === 'left') {
			_rightDropZone.appendChild(_leftDropZone.removeChild(_toc));
			window.localStorage.setItem('tocPosition', 'right');
			_leftDropZone.style.width = '0px';
		}
		else if (tocPosition === 'right') {
			_leftDropZone.appendChild(_rightDropZone.removeChild(_toc));
			window.localStorage.setItem('tocPosition', 'left');
			_rightDropZone.style.width = '0px';
		}
		calculateTOC_Content();
	});
}

module.exports = {
	themeIClickToggleTheme,
	downloadCodesIClickDownloadCodes,
	tocToggleHandler,
	toc_exp_colIClickExp_colTocitems,
	positionIsClickScrollContent,
	clock_progressClickToggleVisibility,
	themeToggler,
	transferIClickSwtichTocPos,
	zen_modeIClickTogglesZenMode
};
