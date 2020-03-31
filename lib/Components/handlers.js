const {
	copyToClipboard,
	createElementFromHTML,
	download,
	simulateClick,
	removeClass,
	toggleProp,
	switchClass
} = require('./utility');

const {
	overlay_cancelIClickCloseOverlay,
	overlay_moveIClickSwitchesBlock,
	customblockClickAppendsOverlay
} = require('./overlay');

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

function themeToggler(new_theme) {
	const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 184 184"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>`;
	const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 291.18 286.8"><defs><style>.cls-1{fill:#ffe817;}.cls-2{fill:#f7bc00;}</style></defs><title>Asset 2</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M289.23,139.85l-24.6-14.3a4.05,4.05,0,0,1-1.1-6.1l18.1-21.8a4,4,0,0,0-2.4-6.6L251.33,86a4,4,0,0,1-3.1-5.4l9.6-26.7a4.09,4.09,0,0,0-4.5-5.4l-28,4.8a4.12,4.12,0,0,1-4.8-4l-.1-28.4a4.06,4.06,0,0,0-6.1-3.5l-24.7,14a4.2,4.2,0,0,1-5.9-2.1l-9.8-26.6a4,4,0,0,0-6.9-1.2l-18.4,21.6a4.08,4.08,0,0,1-6.2,0L124,1.45a4,4,0,0,0-6.9,1.2l-9.8,26.6a4.07,4.07,0,0,1-5.9,2.1l-24.6-14.1a4.09,4.09,0,0,0-6.1,3.5l-.1,28.4a4.12,4.12,0,0,1-4.8,4l-28-4.8a4.06,4.06,0,0,0-4.5,5.4l9.6,26.7a4,4,0,0,1-3.1,5.4L11.93,91a4.05,4.05,0,0,0-2.4,6.6l18.09,21.8a4,4,0,0,1-1.09,6.1L2,139.75a4,4,0,0,0,0,7l24.4,14.5a4.05,4.05,0,0,1,1.1,6.1l-18.1,21.9a4,4,0,0,0,2.4,6.6l27.9,5.1a4,4,0,0,1,3.1,5.4l-9.6,26.7a4.09,4.09,0,0,0,4.5,5.4l28-4.8a4.12,4.12,0,0,1,4.8,4l.1,28.4a4.06,4.06,0,0,0,6.1,3.5l24.7-14.1a4.2,4.2,0,0,1,5.9,2.1l9.8,26.6a4,4,0,0,0,6.9,1.2l18.4-21.6a4.08,4.08,0,0,1,6.2,0l18.4,21.6a4,4,0,0,0,6.9-1.2l9.8-26.6a4.07,4.07,0,0,1,5.9-2.1l24.7,14.1a4.09,4.09,0,0,0,6.1-3.5l.1-28.4a4.12,4.12,0,0,1,4.8-4l28,4.8a4.06,4.06,0,0,0,4.5-5.4l-9.61-26.7a4.06,4.06,0,0,1,3.11-5.4l27.89-5.1a4.05,4.05,0,0,0,2.4-6.6l-18-21.9a4,4,0,0,1,1.1-6.1l24.5-14.3A4.21,4.21,0,0,0,289.23,139.85Zm-143.7,109.5a105.9,105.9,0,1,1,105.9-105.9A105.88,105.88,0,0,1,145.53,249.35Z"/><circle class="cls-2" cx="145.53" cy="143.45" r="92"/></g></g></svg>`;

	_themeIconContainer.removeChild(_themeIconContainer.firstElementChild);
	if (new_theme === 'light') _themeIconContainer.appendChild(createElementFromHTML(lightIcon));
	else if (new_theme === 'dark') _themeIconContainer.appendChild(createElementFromHTML(darkIcon));
}

function fileChildrenToggle() {
	Array.from(document.querySelectorAll('.file-item--toggle')).forEach(_file_toggle => {
		_file_toggle.addEventListener('click', e => {
			_file_toggle.parentElement.nextElementSibling.classList.toggle('hidden');
			const hidden = _file_toggle.parentElement.nextElementSibling.classList.contains('hidden');
			if (hidden) _file_toggle.textContent = '⯇';
			else if (!hidden) _file_toggle.textContent = '⯆';
		});
	});
}

//🔨
function showFile() {
	Array.from(document.querySelectorAll('.file-name')).forEach(_file_name => {
		_file_name.addEventListener('click', e => {
			removeClass('.file-name', 'selected');
			_file_name.classList.add('selected');
			let _traverser = _file_name;
			const file_name = _file_name.querySelector('.file-item--name').textContent;
			const dir_name = _file_name.parentElement.previousElementSibling.querySelector('.file-item--name')
				.textContent;
			while (_traverser.className !== 'file-group') _traverser = _traverser.parentElement;
			const _codeGroup = _traverser.parentElement.querySelector('.code-group');
			const _outputGroup = _traverser.parentElement.querySelector('.output-group');
			const _explanationGroup = _traverser.parentElement.querySelector('.explanation-group');
			Array.from(_codeGroup.children).forEach(_code_block => {
				const _code = _code_block.querySelector('code');
				const cur_file_name = _code.getAttribute('file-name');
				const cur_dir_name = _code.getAttribute('dir-name');
				if (cur_file_name === file_name && cur_dir_name === dir_name) {
					_code_block.style.opacity = '1';
					_code_block.style.zIndex = '1';
				}
				else {
					_code_block.style.opacity = '0';
					_code_block.style.zIndex = '-1';
				}
			});
			if (_outputGroup) {
				Array.from(_outputGroup.children).forEach(_output_block => {
					const cur_file_name = _output_block.getAttribute('file-name');
					const cur_dir_name = _output_block.getAttribute('dir-name');
					if (cur_file_name === file_name && cur_dir_name === dir_name) {
						_output_block.style.opacity = '1';
						_output_block.style.zIndex = '1';
					}
					else {
						_output_block.style.opacity = '0';
						_output_block.style.zIndex = '-1';
					}
				});
			}
			if (_explanationGroup) {
				Array.from(_explanationGroup.children).forEach(_explanation_block => {
					const cur_file_name = _explanation_block.getAttribute('file-name');
					const cur_dir_name = _explanation_block.getAttribute('dir-name');
					if (cur_file_name === file_name && cur_dir_name === dir_name) {
						_explanation_block.style.opacity = '1';
						_explanation_block.style.zIndex = '1';
					}
					else {
						_explanation_block.style.opacity = '0';
						_explanation_block.style.zIndex = '-1';
					}
				});
			}
		});
	});
}

function clock_progressClickToggleVisibility() {
	[
		{ _source: _clockIcon, _target: _clock },
		{ _source: _progressIcon, _target: _progress }
	].forEach(({ _source, _target }) => {
		_source.addEventListener('click', () => {
			toggleProp({ _source, _target, prop: 'opacity', cases: [ '1', '0' ] });
		});
	});
}

function searchButtonHandler() {
	filterByCode();
	filterByCustom();
}

function filterByCode() {
	const tocCodeSearch = window.localStorage.getItem('tocCodeSearch');
	const ignoreCap = window.localStorage.getItem('searchIgnoreCap');
	const tocToggleCustom = window.localStorage.getItem('tocToggleCustom');

	if (tocToggleCustom.toString() !== 'true') {
		_toc_items.forEach(_item => {
			if (tocCodeSearch.toString() === 'true') {
				if (_item.textContent.includes('❰ ❱')) {
					_item.style.display = 'inherit';
					if (ignoreCap.toString() === 'true') {
						if (_item.textContent.toLowerCase().includes(tocInputField.value.toLowerCase()))
							_item.style.display = 'inherit';
						else _item.style.display = 'none';
					}
					else if (_item.textContent.includes(tocInputField.value)) _item.style.display = 'inherit';
					else _item.style.display = 'none';
				}
				else _item.style.display = 'none';
			}
			else if (
				ignoreCap.toString() === 'true' &&
				_item.textContent.toLowerCase().includes(tocInputField.value.toLowerCase())
			)
				_item.style.display = 'inherit';
			else if (ignoreCap.toString() === 'false' && _item.textContent.includes(tocInputField.value))
				_item.style.display = 'inherit';
			else _item.style.display = 'none';
		});
	}
}

function filterByCustom() {
	const tocToggleCustom = window.localStorage.getItem('tocToggleCustom');
	const ignoreCap = window.localStorage.getItem('searchIgnoreCap');
	const tocCodeSearch = window.localStorage.getItem('tocCodeSearch');

	if (tocCodeSearch.toString() !== 'true') {
		_toc_items.forEach(_item => {
			if (tocToggleCustom.toString() === 'true') {
				if (_item.textContent.includes('➥')) {
					_item.style.display = 'inherit';
					if (ignoreCap.toString() === 'true') {
						if (_item.textContent.toLowerCase().includes(tocInputField.value.toLowerCase()))
							_item.style.display = 'inherit';
						else _item.style.display = 'none';
					}
					else if (_item.textContent.includes(tocInputField.value)) _item.style.display = 'inherit';
					else _item.style.display = 'none';
				}
				else _item.style.display = 'none';
			}
			else if (
				ignoreCap.toString() === 'true' &&
				_item.textContent.toLowerCase().includes(tocInputField.value.toLowerCase())
			)
				_item.style.display = 'inherit';
			else if (ignoreCap.toString() === 'false' && _item.textContent.includes(tocInputField.value))
				_item.style.display = 'inherit';
			else _item.style.display = 'none';
		});
	}
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

// ? Clicking on an image enlargens it
function imageClickHandler() {
	Array.from(document.querySelectorAll('img')).forEach(_image => {
		_image.addEventListener('click', e => {
			_overlay.style.display = 'block';
			const clonedImage = _image.cloneNode(true);
			clonedImage.classList.add('swoosh');
			_overlay.appendChild(clonedImage);
		});
	});
}

// ✅
function downloadCodesIClickDownloadCodes() {
	const _downloadCodesIcon = document.getElementById('downloadCodesIcon');
	_downloadCodesIcon.addEventListener('click', e => {
		Array.from(document.querySelectorAll('.code-block .icon--download')).forEach(_code => {
			simulateClick(_code);
		});
	});
}

function overlayHandlers() {
	customblockClickAppendsOverlay();
	overlay_cancelIClickCloseOverlay();
	overlay_moveIClickSwitchesBlock();
}

// ✅
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

// ! Will be changed based on Code organization
function codeDisplayClickHandler() {
	const _codeDisplayIcon = document.getElementById('codeDisplayIcon');
	_codeDisplayIcon.addEventListener('click', e => {
		const isRow = _codeDisplayIcon.classList.contains('row-view');
		if (isRow) {
			_codeDisplayIcon.classList.add('column-view');
			_codeDisplayIcon.classList.remove('row-view');
		}
		else {
			_codeDisplayIcon.classList.add('row-view');
			_codeDisplayIcon.classList.remove('column-view');
		}
		changeCodeDisplay(isRow ? 'R' : 'C');
		window.localStorage.setItem('codeDisplay', isRow ? 'R' : 'C');
	});
}

function changeCodeDisplay(value) {
	Array.from(document.querySelectorAll('.code-block')).forEach(codeBlock => {
		codeBlock.style.flexDirection = value === 'C' ? 'row' : 'column';
	});
}

function scrollIntoViewOutput() {
	const all_outputs = Array.from(document.querySelectorAll('.output-line'));
	all_outputs.forEach(all_output => {
		all_output.addEventListener('click', e => {
			const _output_block = all_output.parentElement;
			const file_name = _output_block.getAttribute('file-name');
			const dir_name = _output_block.getAttribute('dir-name');
			const _code = _output_block.parentElement.previousElementSibling.querySelector(
				`code[dir-name="${dir_name}"][file-name="${file_name}"]`
			);
			const _line = _code.parentElement.querySelector(`div[target-line="${e.target.textContent}"]`);
			scrollHighlightLine(_line);
		});
	});
}

// ! Fix Function
function highlightLineHighlights() {
	Array.from(
		document.querySelectorAll('.highlight-number--low,.highlight-number--medium,.highlight-number--high')
	).forEach(_line_highlight => {
		_line_highlight.addEventListener('click', e => {
			const _explanationBlock = _line_highlight.parentElement.parentElement;
			const file_name = _explanationBlock.getAttribute('file-name');
			const dir_name = _explanationBlock.getAttribute('dir-name');
			const _code = _explanationBlock.parentElement.parentElement.querySelector(
				`code[dir-name="${dir_name}"][file-name="${file_name}"]`
			);
			const _line = _code.parentElement.querySelector(`div[target-line="${e.target.textContent}"]`);
			scrollHighlightLine(_line);
		});
	});
}

function scrollHighlightLine(target) {
	target.classList.add('highlight');
	const target_pos = target.offsetTop;
	target.parentElement.parentElement.parentElement.previousElementSibling.scrollIntoView({
		behavior : 'smooth'
	});
	const current_position = target.parentElement.scrollTop;
	if (current_position < target_pos)
		while (target.parentElement.scrollTop + 475 < target_pos) target.parentElement.scrollBy(0, 50);
	else if (target_pos < current_position)
		while (target.parentElement.scrollTop > target_pos) target.parentElement.scrollBy(0, -50);
	setTimeout(() => {
		target.classList.remove('highlight');
	}, 1000);
}

function keepCodeIconsAtSamePlace() {
	Array.from(document.querySelectorAll('.code-block')).forEach(_code_block => {
		_code_block.addEventListener('scroll', e => {
			const code_width = parseFloat(window.getComputedStyle(e.target).width.replace('px', ''));
			const _copy_icon = _code_block.querySelector('.icon--copy');
			const _download_icon = _code_block.querySelector('.icon--download');
			const _line_number = _code_block.querySelector('.linenumber-container');

			_copy_icon.style.top = `${e.target.scrollTop}px`;
			_copy_icon.style.left = `${parseInt(e.target.scrollLeft) + (code_width - 40)}px`;
			_download_icon.style.top = `${e.target.scrollTop}px`;
			_download_icon.style.left = `${e.target.scrollLeft}px`;
			_line_number.style.left = `${parseInt(e.target.scrollLeft)}px`;
		});
	});
}

function toggleFileSystem() {
	Array.from(document.querySelectorAll('.file-toggle')).forEach(_file_toggle => {
		_file_toggle.addEventListener('click', e => {
			_file_toggle.parentElement.parentElement.classList.toggle('fs--toggle');
		});
	});
}

// ✅
// 💡 Add smoother animation during items transition
function toc_item_toggleIClickTogglesChildDisplay() {
	Array.from(document.querySelectorAll('.icon--toggle')).forEach(_icon => {
		_icon.addEventListener('click', e => {
			_icon.classList.toggle('link--hidden');
			_icon.parentElement.nextElementSibling.classList.toggle('hidden');
		});
	});
}

// ✅
function code_copyIClickCopiesCode() {
	Array.from(document.querySelectorAll('.icon--copy')).forEach(_copy_icon => {
		_copy_icon.addEventListener('click', () => {
			copyToClipboard(_copy_icon.parentElement.querySelector('code').textContent);
			_copy_icon.textContent = 'copied';
			_copy_icon.style.left = 'calc(100% - 65px)';
			setTimeout(() => {
				_copy_icon.textContent = '📄';
				_copy_icon.style.left = 'calc(100% - 30px)';
			}, 1000);
		});
	});
}

// ✅
function code_downloadIClickDownloadsCode() {
	Array.from(document.querySelectorAll('.icon--download')).forEach(_download_icon => {
		_download_icon.addEventListener('click', () => {
			const code = _download_icon.parentElement.querySelector('code');
			download(`${code.getAttribute('file-name')}`, code.textContent);
		});
	});
}

function tocToggleHandler() {
	const _tocToggleIcon = document.getElementById('tocToggleIcon');
	_tocToggleIcon.addEventListener('click', e => {
		e.target.classList.toggle('activated');
		const activated = e.target.classList.contains('activated');
		if (activated) {
			_toc.parentElement.style.width = '0px';
			_toc.style.left = '100%';
			_content.style.width = `calc(100% - 20px)`;
		}
		else {
			_toc.parentElement.style.width = `${window.SETTINGS.tocSize}px`;
			_toc.style.left = `calc(100% - ${window.SETTINGS.tocSize}px)`;
			_content.style.width = `calc(100% - ${parseInt(window.SETTINGS.tocSize) + 20}px)`;
		}
	});
}

module.exports = {
	themeIClickToggleTheme,
	clock_progressClickToggleVisibility,
	positionIsClickScrollContent,
	imageClickHandler,
	downloadCodesIClickDownloadCodes,
	toc_exp_colIClickExp_colTocitems,
	codeDisplayClickHandler,
	highlightLineHighlights,
	scrollIntoViewOutput,
	keepCodeIconsAtSamePlace,
	toc_item_toggleIClickTogglesChildDisplay,
	searchButtonHandler,
	fileChildrenToggle,
	showFile,
	toggleFileSystem,
	tocToggleHandler,
	themeToggler,
	code_copyIClickCopiesCode,
	code_downloadIClickDownloadsCode,
	overlayHandlers
};
