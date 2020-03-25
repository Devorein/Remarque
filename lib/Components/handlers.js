const { copyToClipboard, download, simulateClick, themeToggler } = require('./utility');

// ? Change from dark to light theme
function themeToggleHandler() {
	document.querySelector('#theme-icon-container').addEventListener('click', () => {
		const body = document.querySelector('body#preview');
		if (body.classList.contains('dark')) {
			themeToggler('dark', 'light');
			window.localStorage.setItem('theme', 'light');
		}
		else if (body.classList.contains('light')) {
			themeToggler('light', 'dark');
			window.localStorage.setItem('theme', 'dark');
		}
	});
}

function highlightLineHighlights() {
	Array.from(
		document.querySelectorAll('.highlight--low,.highlight--medium,.highlight--high')
	).forEach((line_highlight) => {
		line_highlight.addEventListener('click', () => {
			const target = line_highlight.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.querySelector(
				`div[data-range='${line_highlight.textContent}']`
			);
			scrollHighlightLine(target);
		});
	});
}

function clock_progressToggleHandler() {
	const _clock = document.getElementById('clock');
	const _clockIcon = document.getElementById('clockIcon');
	const _progress = document.getElementById('progress');
	const _progressIcon = document.getElementById('progressIcon');

	[ _clockIcon, _progressIcon ].forEach((icon) => {
		icon.addEventListener('click', (e) => {
			icon.classList.toggle('activated');
			const active = icon.classList.contains('activated');
			const target = icon.id === 'progressIcon' ? _progress : _clock;
			target.style.opacity = active ? '1' : '0';
		});
	});
}

function searchButtonHandler(button, status) {
	if (status !== '' && status !== null) {
		Object.entries(allTOCElems).forEach(([ id, textContent ]) => {
			if (button === 'tocCodeSearch' && status.toString() === 'true' && !textContent.includes('❰ ❱'))
				document.getElementById(id).style.display = 'none';
			else if (button === 'tocToggleCustom' && status.toString() === 'true' && !textContent.includes('➥'))
				document.getElementById(id).style.display = 'none';
			else document.getElementById(id).style.display = 'initial';
		});
	}
}

// ? Move to top or bottom of screen
function extremePositionHandler() {
	const _pageExtremeTopIcon = document.getElementById('pageExtremeTopIcon');
	const _pageExtremeBottomIcon = document.getElementById('pageExtremeBottomIcon');
	[ _pageExtremeTopIcon, _pageExtremeBottomIcon ].forEach((icon) => {
		icon.addEventListener('click', (e) => {
			document.getElementById(icon.id.includes('Bottom') ? 'bottom' : 'top').scrollIntoView({
				behavior : 'smooth'
			});
		});
	});
}

// ? Clicking on an image enlargens it
function imageClickHandler() {
	Array.from(document.querySelectorAll('img')).forEach((image) => {
		image.addEventListener('click', (e) => {
			_overlay.style.display = 'block';
			const clonedImage = image.cloneNode(true);
			clonedImage.classList.add('swoosh');
			_overlay.appendChild(clonedImage);
		});
	});
}

function downloadAllCodeHandler() {
	const _downloadCodesIcon = document.getElementById('downloadCodesIcon');
	_downloadCodesIcon.addEventListener('click', (e) => {
		const _allCodes = Array.from(document.querySelectorAll('.line-numbers code'));
		_allCodes.forEach((_code) => {
			const filename = _code.getAttribute('file-name') + '.' + _code.classList[0];
			const code = _code.textContent;
			download(filename, code);
		});
	});
}

// ? Clicking on overlay cancels it
function overlayClickHandler() {
	_overlay.addEventListener('click', (e) => {
		_overlay.style.display = 'none';
		_overlay.removeChild(_overlay.firstElementChild);
	});
}

function blockClickEnlargenHandler() {
	Array.from(document.querySelectorAll('.block-container .text-block')).forEach((textBlock, index) => {
		textBlock.addEventListener('click', (e) => {
			blockContainerChild = index;
			_overlay.style.display = 'block';
			const clonedtextBlock = textBlock.cloneNode(true);
			_overlay.appendChild(clonedtextBlock);
		});
	});
}

// : Refactor
function expand_collapseTocHandler() {
	const _collapseTOCIcon = document.getElementById('collapseTOC');
	const _expandTOCIcon = document.getElementById('expandTOC');

	_expandTOCIcon.addEventListener('click', (e) => {
		Array.from(document.querySelectorAll('.icon--toggle')).forEach((toggleIcon) => {
			if (toggleIcon.classList.contains('link--hidden')) {
				simulateClick(toggleIcon);
			}
		});
	});

	_collapseTOCIcon.addEventListener('click', (e) => {
		Array.from(document.querySelectorAll('.icon--toggle')).forEach((toggleIcon) => {
			if (!toggleIcon.classList.contains('link--hidden')) {
				simulateClick(toggleIcon);
			}
		});
	});
}

function codeDisplayClickHandler() {
	const _codeDisplayIcon = document.getElementById('codeDisplayIcon');
	_codeDisplayIcon.addEventListener('click', (e) => {
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
	Array.from(document.querySelectorAll('.code-block')).forEach((codeBlock) => {
		codeBlock.style.flexDirection = value === 'C' ? 'row' : 'column';
	});
}

function scrollIntoViewOutput() {
	const all_outputs = Array.from(document.querySelectorAll('.output-line'));
	all_outputs.forEach((all_output) => {
		all_output.addEventListener('click', (e) => {
			const target = e.target.parentElement.parentElement.previousElementSibling.querySelector(
				`div[data-range='${e.target.textContent}']`
			);
			scrollHighlightLine(target);
		});
	});
}

function scrollHighlightLine(target) {
	target.classList.add('highlight');
	const target_pos = target.offsetTop;
	target.parentElement.scrollIntoView({
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

function collapseLinks() {
	Array.from(document.querySelectorAll('.icon--toggle')).forEach((icon) => {
		icon.addEventListener('click', (e) => {
			icon.classList.toggle('link--hidden');
			icon.parentElement.nextElementSibling.classList.toggle('hidden');
		});
	});
}

function codeCopyHandlers() {
	Array.from(document.querySelectorAll('.icon--copy')).forEach((copy_icon) => {
		copy_icon.addEventListener('click', () => {
			copyToClipboard(copy_icon.parentElement.querySelector('code').textContent);
			copy_icon.textContent = 'copied';
			copy_icon.style.left = 'calc(100% - 65px)';
			setTimeout(() => {
				copy_icon.textContent = '📄';
				copy_icon.style.left = 'calc(100% - 30px)';
			}, 1000);
		});
	});
}

function codeDownloadHandler() {
	Array.from(document.querySelectorAll('.icon--download')).forEach((download_icon) => {
		download_icon.addEventListener('click', () => {
			const code = download_icon.parentElement.querySelector('code');
			download(`${code.getAttribute('file-name')}.${code.classList[0]}`, code.textContent);
		});
	});
}

function codeIconHandlers() {
	codeCopyHandlers();
	codeDownloadHandler();
}

module.exports = {
	themeToggleHandler,
	clock_progressToggleHandler,
	extremePositionHandler,
	imageClickHandler,
	downloadAllCodeHandler,
	overlayClickHandler,
	blockClickEnlargenHandler,
	expand_collapseTocHandler,
	codeDisplayClickHandler,
	highlightLineHighlights,
	scrollIntoViewOutput,
	collapseLinks,
	searchButtonHandler,
	codeIconHandlers
};
